const passport = require('passport')

const { User, Post, Draft } = require('../models')
const { titleSlugger } = require('../helpers')

const Router = new require('express').Router() // eslint-disable-line new-cap

const genericErrorMessage = 'Something went wrong :(. Consider contacting albernazmiguel@gmail.com'


Router.get('/', (req, res) => {
  Post.find().exec()

  // return posts or a message saying there ain't any
  .then(posts => {
    if (posts.length < 1) {
      return res.send({
        success: false,
        message: 'there are no posts yet'
      })
    }

    return res.json({
      success: true,
      message: 'successfully loaded posts',
      posts
    })
  })

  // catch any error
  .catch(() => res.send({
    success: false,
    message: genericErrorMessage
  }))
})

Router.get('/:slug', ({ params: { slug } }, res) => {
  Post.findOne({ slug }).exec()

  // search post by slug
  .then(post => res.json({
    success: true,
    message: 'successfully loaded post',
    post
  }))

  // catch any error
  .catch(() => res.status(404).send({
    success: false,
    message: 'this post does not exist'
  }))
})


Router.post('/', passport.authenticate('jwt', {
  session: false
}), ({ body: { raw, meta, html, _id }, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newPost = new Post({
    raw,
    html,
    slug,
    meta: Object.assign(meta, { author: user._id })
  })

  // check if theres a corespondent draft saved
  Draft.findOneAndRemove({ _id }).exec()

  // find post owner
  .then(() => User.findOne({ _id: user._id }).exec())

  // update user with new post
  .then(postOwner => {
    postOwner.posts.push(newPost._id)
    return postOwner.save()
  })

  // save post
  .then(() => newPost.save())

  // send ok response
  .then(() => res.json({
    success: true,
    message: 'successfully created post'
  }))

  // catch any error
  .catch(err => res.status(404).json({
    success: false,
    message: err.code === 11000 ?
      'could not create post. existent title' :
      genericErrorMessage
  }))
})


Router.put('/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params: { slug }, user }, res) => {
  Post.findOne({ slug }).exec()

  // save new post data,
  // or reject if the user is not the owner of the post
  .then(post => {
    if (post.meta.author.toString() !== user._id.toString()) {
      return Promise.reject({ why: 'unauthorized' })
    }

    const self = post

    self.meta = Object.assign(meta, { author: user._id }) || post.meta
    self.html = html || post.html
    self.raw = raw || post.raw
    self.slug = titleSlugger(meta.title)

    return self.save()
  })

  // send ok response
  .then(() => res.json({
    success: true,
    message: 'successfully edited post'
  }))

  // catch any error
  .catch(err => res.status(400).json({
    success: false,
    message: err.why === 'unathorized' ?
      'You do not own this post' :
      'something went wrong. could\'t edit post'
  }))
})


Router.delete('/:_id', passport.authenticate('jwt', {
  session: false
}), ({ params, user }, res) => {
  User.findOne({ _id: user._id }).exec()

  // If the user is not the owner of the post reject, else query on posts
  .then(postOwner => {
    const self = postOwner

    if (self.posts.indexOf(params._id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return Post.findOne({ _id: params._id }).exec()
  })

  // If unexistent reject, else delete
  .then(post => {
    if (!post) {
      return Promise.reject({ why: 'inexsistent' })
    }

    return post.remove()
  })

  // send ok response
  .then(() => res.json({
    success: true,
    message: 'successfully deleted post'
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'unauthorized') {
      return res.status(401).json({
        success: false,
        message: 'you do not own this post'
      })
    }

    if (err.why === 'inexistent') {
      return res.status(400).json({
        success: false,
        message: 'could\'t delete post. inexsistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})


Router.put('/unpublish/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html, _id }, params, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newDraft = new Draft({
    raw,
    html,
    slug,
    meta: Object.assign(meta, { author: user._id })
  })

  User.findOne({ _id: user._id }).exec()

  // If the user is not the owner of the post reject, else query on posts
  .then(postOwner => {
    const self = postOwner

    if (self.posts.indexOf(_id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return Post.findOne({ _id }).exec()
  })

  // If unexistent reject, else delete
  .then(post => {
    if (!post) {
      return Promise.reject({ why: 'inexsistent' })
    }

    return post.remove()
  })

  // save unpublished post as draft
  .then(() => newDraft.save())

  // send ok response
  .then(() => res.json({
    success: true,
    message: 'successfully unpublished post'
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'unauthorized') {
      return res.status(401).json({
        success: false,
        message: 'you do not own this post'
      })
    }

    if (err.why === 'inexistent') {
      return res.status(400).json({
        success: false,
        message: 'could\'t unpublish post. inexsistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})

module.exports = Router

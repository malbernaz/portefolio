const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const { User, Post, Draft } = require('../models')
const { titleSlugger } = require('../helpers')

const Router = new express.Router()

const genericErrorMessage =
  'something went wrong. consider sending an email to albernazmiguel@gmail.com'

Router.get('/', (req, res) => {
  Post.find().exec()

  // return posts or a message saying there ain't any
  .then(posts => res.json({
    success: true,
    message: 'successfully loaded posts',
    posts
  }))

  // catch any error
  .catch(() => res.status(400).send({
    success: false,
    message: genericErrorMessage
  }))
})


Router.get('/:slug', ({ params: { slug } }, res) => {
  Post.findOne({ slug }).exec()

  // search post by slug
  .then(post => {
    if (!post) return Promise.reject()

    return res.json({
      success: true,
      message: 'successfully loaded post',
      post
    })
  })

  // catch any error
  .catch(() => res.status(404).send({
    success: false,
    message: 'this post does not exist'
  }))
})


Router.post('/', passport.authenticate('jwt', {
  session: false
}), ({ body: { raw, meta, html, _id, createdAt }, user }, res) => {
  const newPost = new Post({
    raw,
    html,
    updatedAt: new Date(),
    meta: Object.assign(meta, { author: user._id })
  })

  if (_id) newPost._id = new mongoose.Types.ObjectId(_id)

  if (createdAt) newPost.createdAt = createdAt

  // check if theres a corespondent draft saved
  Draft.findById(_id).exec()

  // remove if existent
  .then(draft => draft ? draft.remove() : true)

  // save post
  .then(() => newPost.save())

  // send ok response
  .then(post => res.json({
    success: true,
    message: 'successfully created post',
    post
  }))

  // catch any error
  .catch(err => {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'could not create post. existent title'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})


Router.patch('/:_id', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params: { _id }, user }, res) => {
  Post.findById(_id).exec()

  // reject if the user is not the owner of the post or if it does'nt exist,
  // or update post data
  .then(post => {
    if (post.meta.author.toString() !== user._id.toString()) {
      return Promise.reject({ why: 'unauthorized' })
    }

    const newData = Object.assign(post, {
      html,
      raw,
      slug: titleSlugger(meta.title),
      updatedAt: new Date(),
      meta: Object.assign(post.meta, meta)
    })

    return post.update({ $set: newData })
  })

  // update method does not return updated doc
  .then(() => Post.findById(_id).exec())

  // send ok response
  .then(post => res.json({
    success: true,
    message: 'successfully updated post',
    post
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'unauthorized') {
      return res.status(401).json({
        success: false,
        message: 'you do not own this post'
      })
    }

    return res.status(404).json({
      success: false,
      message: 'could not update post. inexsistent'
    })
  })
})


Router.delete('/:_id', passport.authenticate('jwt', {
  session: false
}), ({ params: { _id }, user }, res) => {
  Promise.all([
    User.findOne({ _id: user._id }).exec()
      .then(result => ({ postOwner: result })),
    Post.findOne({ _id }).exec()
      .then(result => ({ post: result }))
      .catch(() => Promise.reject({ why: 'inexsistent' }))
  ])

  // if the user is not the owner of the post
  // and if the post does not exist reject, else remove post
  .then(result => {
    const { post } = result.filter(r => Object.hasOwnProperty.call(r, 'post'))[0]
    const { postOwner } = result.filter(r => Object.hasOwnProperty.call(r, 'postOwner'))[0]

    if (postOwner.posts.indexOf(_id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return post.remove()
  })


  // send ok response
  .then(post => res.json({
    success: true,
    message: 'successfully deleted post',
    post
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'unauthorized') {
      return res.status(401).json({
        success: false,
        message: 'you do not own this post'
      })
    }

    if (err.why === 'inexsistent' || err.code === 11000) {
      return res.status(404).json({
        success: false,
        message: 'could not delete post. inexsistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})


Router.put('/unpublish/:_id', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params: { _id }, user }, res) => {
  Promise.all([
    User.findOne({ _id: user._id }).exec()
      .then(result => ({ postOwner: result })),
    Post.findById(_id).exec()
      .then(result => ({ post: result }))
      .catch(() => Promise.reject({ why: 'inexsistent' }))
  ])

  // check if post exists and if the user owns that post,
  // if yes remove post and update users drafts
  .then(result => {
    const { post } = result.filter(r => Object.hasOwnProperty.call(r, 'post'))[0]
    const { postOwner } = result.filter(r => Object.hasOwnProperty.call(r, 'postOwner'))[0]

    if (postOwner.posts.indexOf(_id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return post.remove()
  })

  // save unpublished post as draft
  .then(post => {
    const newDraft = new Draft({
      raw: raw || post.raw,
      html: html || post.html,
      updatedAt: new Date(),
      meta: Object.assign(post.meta, meta),
      _id: new mongoose.Types.ObjectId(_id)
    })

    return newDraft.save()
  })

  // send ok response
  .then(draft => res.json({
    success: true,
    message: 'successfully unpublished post',
    draft
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'unauthorized') {
      return res.status(401).json({
        success: false,
        message: 'you do not own this post'
      })
    }

    if (err.why === 'inexsistent' || err.code === 11000) {
      return res.status(404).json({
        success: false,
        message: 'could not unpublish post. inexsistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})

module.exports = Router

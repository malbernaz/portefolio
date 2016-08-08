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
}), ({ body: { raw, meta, html, _id, createdAt }, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newPost = new Post({
    raw,
    html,
    slug,
    updatedAt: new Date(),
    meta: Object.assign(meta, { author: user._id })
  })

  if (_id) newPost._id = new mongoose.Types.ObjectId(_id)

  if (createdAt) newPost.createdAt = createdAt

  Post.findOne({ slug }).exec()

  // check if theres a corespondent draft saved
  .then(post => post ?
    Promise.reject({ why: 'existent title' }) :
    Draft.findOne({ _id }).exec())

  // remove if existent
  .then(draft => {
    if (draft) return draft.remove()

    return true
  })

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
    if (err.why === 'existent title') {
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


Router.patch('/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html, _id }, params: { slug }, user }, res) => {
  Post.findOne({ slug }).exec()

  // reject if the user is not the owner of the post or if it does'nt exist,
  // or update post data
  .then(post => {
    if (!post) {
      return Promise.reject({ why: 'inexsistent' })
    }

    if (post.meta.author.toString() !== user._id.toString()) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return post.update({
      $set: {
        html,
        raw,
        slug: titleSlugger(meta.title),
        updatedAt: new Date(),
        meta: {
          title: meta.title,
          description: meta.description,
          tags: meta.tags,
          author: user._id
        }
      }
    })
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
        message: 'you do not own this draft'
      })
    }

    if (err.why === 'inexistent') {
      return res.status(404).json({
        success: false,
        message: 'could\'t update draft. inexsistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})


Router.delete('/:_id', passport.authenticate('jwt', {
  session: false
}), ({ params, user }, res) => {
  User.findOne({ _id: user._id }).exec()

  // if the user is not the owner of the post reject, else query on posts
  .then(postOwner => {
    if (postOwner.posts.indexOf(params._id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return Post.findOne({ _id: params._id }).exec()
  })

  // if unexistent reject, else delete
  .then(post => {
    if (!post) {
      return Promise.reject({ why: 'inexsistent' })
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
}), ({ body: { raw, meta, html, _id, createdAt }, params, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newDraft = new Draft({
    raw,
    html,
    slug,
    updatedAt: new Date(),
    meta: Object.assign(meta, { author: user._id })
  })

  if (_id) newDraft._id = new mongoose.Types.ObjectId(_id)

  if (createdAt) newDraft.createdAt = createdAt

  Promise.all([
    User.findOne({ _id: user._id }).exec()
      .then(result => ({ postOwner: result }))
      .catch(err => err),
    Post.findOne({ _id }).exec()
      .then(result => ({ post: result }))
      .catch(err => err)
  ])

  // check if post exists and if the user owns that post,
  // if yes remove post and update users drafts
  .then(result => {
    const { post } = result.filter(r => Object.hasOwnProperty.call(r, 'post')).pop()
    const { postOwner } = result.filter(r => Object.hasOwnProperty.call(r, 'postOwner')).pop()

    if (!post) {
      return Promise.reject({ why: 'inexsistent' })
    }

    if (postOwner.posts.indexOf(_id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return post.remove()
  })

  // save unpublished post as draft
  .then(() => newDraft.save())

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

module.exports = Router

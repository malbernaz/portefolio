const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const { Post, Draft } = require('../models')
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
}), ({ body: { raw, meta, html, _id }, user }, res) => {
  // check if theres a corespondent draft saved
  Draft.findOne({ _id, 'meta.author': user._id }).exec()

  // remove if existent
  .then(draft => draft !== null ? draft.remove() : false)

  // save post
  .then(draft => {
    if (!draft) {
      return new Post({
        raw,
        html,
        meta: Object.assign(meta, { author: user._id })
      }).save()
    }

    return new Post({
      raw: raw || draft.raw,
      html: html || draft.html,
      updatedAt: new Date(),
      createdAt: draft.createdAt,
      meta: Object.assign(draft.meta, meta),
      _id: new mongoose.Types.ObjectId(_id)
    }).save()
  })

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
  Post.findOne({ _id, 'meta.author': user._id }).exec()

  // reject if the user is not the owner of the post or if it does'nt exist,
  // or update post data
  .then(post => {
    if (post === null) {
      return Promise.reject({ why: 'inexistent' })
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
    if (err.why === 'inexistent' || err.code === 11000) {
      return res.status(404).json({
        success: false,
        message: 'could not update post. inexistent'
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
}), ({ params: { _id }, user }, res) => {
  Post.findOne({ _id, 'meta.author': user._id }).exec()

  // if the post does not exist reject, else remove post
  .then(post => post === null ? Promise.reject({ why: 'inexistent' }) : post.remove())


  // send ok response
  .then(post => res.json({
    success: true,
    message: 'successfully deleted post',
    post
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'inexistent' || err.code === 11000) {
      return res.status(404).json({
        success: false,
        message: 'could not delete post. inexistent'
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
  Post.findOne({ _id, 'meta.author': user._id }).exec()

  // if the post does not exist reject, else remove post
  .then(post => post === null ? Promise.reject({ why: 'inexistent' }) : post.remove())

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
    if (err.why === 'inexistent' || err.code === 11000) {
      return res.status(404).json({
        success: false,
        message: 'could not unpublish post. inexistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})

module.exports = Router

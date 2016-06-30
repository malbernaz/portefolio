const passport = require('passport')

const { User, Draft } = require('../models')
const { titleSlugger } = require('../helpers')

const Router = new require('express').Router() // eslint-disable-line new-cap

const genericErrorMessage = 'Something went wrong :(. Consider contacting albernazmiguel@gmail.com'


Router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Draft.find().exec()

  // return drafts or a message saying there ain't any
  .then(drafts => {
    if (drafts.length < 1) {
      return res.status(400).send({
        success: false,
        message: 'there are no drafts yet'
      })
    }

    return res.json({
      success: true,
      message: 'successfully loaded drafts',
      drafts
    })
  })

  // catch any error
  .catch(() => res.send({
    success: false,
    message: genericErrorMessage
  }))
})


Router.get('/:slug', passport.authenticate('jwt', {
  session: false
}), ({ params: { slug } }, res) => {
  Draft.findOne({ slug }).exec()

  // search draft by slug
  .then(draft => res.json({
    success: true,
    message: 'successfully loaded draft',
    draft
  }))

  // catch any error
  .catch(() => res.status(404).send({
    success: false,
    message: 'this draft does not exist'
  }))
})

Router.post('/', passport.authenticate('jwt', {
  session: false
}), ({ body: { raw, meta, html, _id }, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newDraft = new Draft({
    raw,
    html,
    slug,
    meta: Object.assign(meta, { author: user._id })
  })

  // find draft owner
  User.findOne({ _id: user._id }).exec()

  // update user with new post
  .then(draftOwner => {
    draftOwner.push(newDraft._id)
    return draftOwner.save()
  })

  // save post
  .then(() => newDraft.save())

  // send ok response
  .then(() => res.json({
    success: true,
    message: 'successfully created draft'
  }))

  // catch any error
  .catch(err => res.status(404).json({
    success: false,
    message: err.code === 11000 ?
      'could not create draft. existent title' :
      genericErrorMessage
  }))
})


Router.put('/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params: { slug }, user }, res) => {
  Draft.findOne({ slug }).exec()

  // save new draft data,
  // or reject if the user is not the owner of the draft
  .then(draft => {
    if (draft.meta.author.toString() !== user._id.toString()) {
      return Promise.reject({ why: 'unauthorized' })
    }

    const self = draft

    self.meta = Object.assign(meta, { author: user._id }) || draft.meta
    self.html = html || draft.html
    self.raw = raw || draft.raw
    self.slug = titleSlugger(meta.title)

    return self.save()
  })

  // send ok response
  .then(() => res.json({
    success: true,
    message: 'successfully edited draft'
  }))

  // catch any error
  .catch(err => res.status(400).json({
    success: false,
    message: err.why === 'unathorized' ?
      'you do not own this draft' :
      'something went wrong. could\'t edit draft'
  }))
})


Router.delete('/:_id', passport.authenticate('jwt', {
  session: false
}), ({ params, user }, res) => {
  User.findOne({ _id: user._id }).exec()

  // If the user is not the owner of the draft reject, else query on drafts
  .then(draftOwner => {
    const self = draftOwner

    if (self.drafts.indexOf(params._id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return Draft.findOne({ _id: params._id }).exec()
  })

  // If unexistent reject, else delete
  .then(draft => {
    if (!draft) {
      return Promise.reject({ why: 'inexsistent' })
    }

    return draft.remove()
  })

  // send ok response
  .then(() => res.json({
    success: true,
    message: 'successfully deleted draft'
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
      return res.status(400).json({
        success: false,
        message: 'could\'t delete draft. inexsistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})

module.exports = Router

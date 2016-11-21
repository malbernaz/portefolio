import express from 'express'
import passport from 'passport'

import { Draft } from '../models'
import titleSlugger from '../helpers'

const Router = new express.Router()

const genericErrorMessage =
  'something went wrong. consider sending an email to albernazmiguel@gmail.com'


Router.get('/', passport.authenticate('jwt', {
  session: false
}), ({ user: { _id } }, res) => {
  Draft.find({ 'meta.author': _id }).exec()

  // return drafts or a message saying there ain't any
  .then(drafts => res.json({
    success: true,
    message: 'successfully loaded drafts',
    drafts
  }))

  // catch any error
  .catch(() => res.send({
    success: false,
    message: genericErrorMessage
  }))
})


Router.get('/:_id', passport.authenticate('jwt', {
  session: false
}), ({ params, user }, res) => {
  Draft.findOne({ _id: params._id, 'meta.author': user._id }).exec()

  // search draft by slug
  .then(draft => draft !== null ? res.json({
    success: true,
    message: 'successfully loaded draft',
    draft
  }) : Promise.reject())

  // catch any error
  .catch(() => res.status(404).send({
    success: false,
    message: 'this draft does not exist'
  }))
})

Router.post('/', passport.authenticate('jwt', {
  session: false
}), ({ body: { raw, meta, html }, user }, res) => {
  // save draft
  Promise.resolve(
    new Draft({
      raw,
      html,
      meta: { ...meta, author: user._id }
    }).save()
  )

  // send ok response
  .then(draft => res.json({
    success: true,
    message: 'successfully created draft',
    draft
  }))

  // catch any error
  .catch(() => res.status(400).json({
    success: false,
    message: genericErrorMessage
  }))
})


Router.patch('/:_id', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params: { _id }, user }, res) => {
  Draft.findOne({ _id, 'meta.author': user._id }).exec()

  // save new draft data,
  // or reject if the user is not the owner of the draft
  .then(draft => {
    if (draft === null) {
      return Promise.reject({ why: 'inexistent' })
    }

    const newData = {
      ...draft,
      html,
      raw,
      slug: titleSlugger(meta.title),
      updatedAt: new Date(),
      meta: { ...draft.meta, ...meta }
    }

    return draft.update({ $set: newData })
  })

  // update method does not return updated doc
  .then(() => Draft.findById(_id).exec())

  // send ok response
  .then(draft => res.json({
    success: true,
    message: 'successfully updated draft',
    draft
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'inexistent') {
      return res.status(404).json({
        success: false,
        message: 'could not update draft. inexistent'
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
  Draft.findOne({ _id, 'meta.author': user._id }).exec()

  // if unexistent reject, else delete
  .then(draft => draft === null ? Promise.reject({ why: 'inexistent' }) : draft.remove())

  // send ok response
  .then(draft => res.json({
    success: true,
    message: 'successfully deleted draft',
    draft
  }))

  // catch any error
  .catch(err => {
    if (err.why === 'inexistent') {
      return res.status(404).json({
        success: false,
        message: 'could not delete draft. inexistent'
      })
    }

    return res.status(400).json({
      success: false,
      message: genericErrorMessage
    })
  })
})

export default Router

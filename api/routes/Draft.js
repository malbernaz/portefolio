const passport = require('passport')

const { User, Draft } = require('../models')
const { titleSlugger } = require('../helpers')

const Router = new require('express').Router() // eslint-disable-line new-cap

const genericErrorMessage =
  'something went wrong. consider sending an email to albernazmiguel@gmail.com'


Router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Draft.find().exec()

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
}), ({ body: { raw, meta, html, createdAt }, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newDraft = new Draft({
    raw,
    html,
    slug,
    createdAt,
    meta: Object.assign(meta, { author: user._id })
  })

  // save draft
  Promise.resolve(newDraft.save())

  // send ok response
  .then(draft => res.json({
    success: true,
    message: 'successfully created draft',
    draft
  }))

  // catch any error
  .catch(err => {
    if (err.code) {
      return res.status(400).json({
        success: false,
        message: 'could not create draft. existent title'
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
}), ({ body: { raw, meta, html }, params: { slug }, user }, res) => {
  Draft.findOne({ slug }).exec()

  // save new draft data,
  // or reject if the user is not the owner of the draft
  .then(draft => {
    if (!draft) {
      return Promise.reject({ why: 'inexsistent' })
    }

    if (draft.meta.author.toString() !== user._id.toString()) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return draft.update({
      $set: {
        html,
        raw,
        slug: titleSlugger(meta.title),
        meta: {
          title: meta.title,
          subtitle: meta.subtitle,
          tags: meta.tags
        }
      }
    })
  })

  // send ok response
  .then(draft => res.json({
    success: true,
    message: 'successfully updated draft',
    draft
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

  // if the user is not the owner of the draft reject, else query on drafts
  .then(draftOwner => {
    const self = draftOwner

    if (self.drafts.indexOf(params._id) < 0) {
      return Promise.reject({ why: 'unauthorized' })
    }

    return Draft.findOne({ _id: params._id }).exec()
  })

  // if unexistent reject, else delete
  .then(draft => {
    if (!draft) {
      return Promise.reject({ why: 'inexsistent' })
    }

    return draft.remove()
  })

  // send ok response
  .then(draft => res.json({
    success: true,
    message: 'successfully deleted draft',
    draft
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

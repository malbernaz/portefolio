const passport = require('passport')

const { User, Draft } = require('../models')
const { titleSlugger } = require('../helpers')

const Router = new require('express').Router() //  eslint-disable-line

Router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Draft.find({}, (draftErr, drafts) => {
    if (draftErr) return res.send(draftErr)
    if (drafts.length < 1) {
      return res.send({
        status: {
          success: false,
          message: 'There are no drafts yet'
        }
      })
    }

    return res.json({
      status: {
        success: 'Successfully loaded drafts',
        drafts
      }
    })
  })
})

Router.get('/:slug', passport.authenticate('jwt', {
  session: false
}), ({ params: { slug } }, res) => {
  Draft.findOne({ slug }, (err, draft) => {
    if (err || !draft) {
      return res.status(404).send({
        status: {
          success: false,
          message: 'this draft does not exist'
        }
      })
    }

    return res.json({
      status: {
        success: 'Successfully loaded draft',
        draft
      }
    })
  })
})

Router.post('/', passport.authenticate('jwt', {
  session: false
}), ({ body: { raw, meta, html }, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newDraft = new Draft({
    raw,
    html,
    slug,
    meta: Object.assign(meta, { author: user._id })
  })

  Draft.findOne({ slug }, (draftErr, draft) => {
    if (draft) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'The title produces an existent slug'
        }
      })
    }

    return User.findOne({ _id: user._id }, (userErr, draftUser) => {
      if (userErr) return res.send(userErr)

      const self = draftUser

      self.drafts.push(newDraft._id)

      return self.save(draftUserErr => {
        if (draftUserErr) return res.send(draftUserErr)

        return newDraft.save(newDraftErr => {
          if (newDraftErr) return res.send(newDraftErr)

          return res.json({
            status: {
              success: true,
              message: 'successfully created draft'
            }
          })
        })
      })
    })
  })
})

Router.put('/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params, user }, res) => {
  Draft.findOne({ slug: params.slug }, (draftErr, draft) => {
    if (draftErr) {
      console.log(draftErr.toJSON())

      return res.status(400).json({
        status: {
          success: false,
          message: 'something went wrong. could\'t edit draft'
        }
      })
    }

    if (draft.meta.author.toString() !== user._id.toString()) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'You do not own this draft'
        }
      })
    }

    const self = draft

    self.meta = Object.assign(meta, { author: user._id }) || draft.meta
    self.html = html || draft.html
    self.raw = raw || draft.raw
    self.slug = titleSlugger(meta.title)

    return self.save(saveErr => {
      if (saveErr) return res.send(saveErr)

      return res.json({
        status: {
          success: true,
          message: 'successfully edited draft'
        }
      })
    })
  })
})

Router.delete('/:slug', passport.authenticate('jwt', {
  session: false
}), ({ params, user }, res) => {
  Draft.findOneAndRemove({ slug: params.slug }, (draftErr, draft) => {
    if (draftErr) {
      console.log(draftErr.toJSON())

      return res.json({
        status: {
          success: false,
          message: 'something went wrong. could\'t delete draft'
        }
      })
    }

    if (!draft) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'could\'t delete draft. inexsistent'
        }
      })
    }

    if (draft.meta.author.toString() !== user._id.toString()) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'You do not own this draft'
        }
      })
    }

    return User.findOne({ _id: user._id }, (draftUserErr, draftUser) => {
      if (draftUserErr) {
        console.log(draftUserErr.toJSON())
      }

      const self = draftUser

      self.drafts = user.drafts.splice(self.drafts.indexOf(draft._id), 1)

      return self.save(saveErr => {
        if (saveErr) return res.send(saveErr)

        return res.json({
          status: {
            success: true,
            message: 'successfully deleted draft'
          }
        })
      })
    })
  })
})

module.exports = Router

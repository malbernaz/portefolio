const passport = require('passport')

const { User, Post, Draft } = require('../models')
const { titleSlugger } = require('../helpers')

const Router = new require('express').Router() //  eslint-disable-line

Router.get('/', (req, res) => {
  Post.find({}, (postErr, posts) => {
    if (postErr) return res.send(postErr)
    if (posts.length < 1) {
      return res.send({
        status: {
          success: false,
          message: 'There are no posts yet'
        }
      })
    }

    return res.json({
      status: {
        success: 'Successfully loaded posts',
        posts
      }
    })
  })
})

Router.get('/:slug', ({ params: { slug } }, res) => {
  Post.findOne({ slug }, (err, post) => {
    if (err || !post) {
      return res.status(404).send({
        status: {
          success: false,
          message: 'this post does not exist'
        }
      })
    }

    return res.json({
      status: {
        success: 'Successfully loaded post',
        post
      }
    })
  })
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

  Post.findOne({ slug }, (postErr, post) => {
    if (post) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'The title produces an existent slug'
        }
      })
    }

    return Draft.findOneAndRemove({ _id }, (draftErr) => {
      if (draftErr) return res.send(draftErr)

      return User.findOne({ _id: user._id }, (userErr, postUser) => {
        if (userErr) return res.send(userErr)

        const self = postUser

        self.posts.push(newPost._id)

        return self.save(postUserErr => {
          if (postUserErr) return res.send(postUserErr)

          return newPost.save(newPostErr => {
            if (newPostErr) return res.send(newPostErr)

            return res.json({
              status: {
                success: true,
                message: 'successfully created post'
              }
            })
          })
        })
      })
    })
  })
})

Router.put('/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params, user }, res) => {
  Post.findOne({ slug: params.slug }, (postErr, post) => {
    if (postErr) {
      console.log(postErr.toJSON())

      return res.status(400).json({
        status: {
          success: false,
          message: 'something went wrong. could\'t edit post'
        }
      })
    }

    if (post.meta.author.toString() !== user._id.toString()) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'You do not own this post'
        }
      })
    }

    const self = post

    self.meta = Object.assign(meta, { author: user._id }) || post.meta
    self.html = html || post.html
    self.raw = raw || post.raw
    self.slug = titleSlugger(meta.title)

    return self.save(saveErr => {
      if (saveErr) return res.send(saveErr)

      return res.json({
        status: {
          success: true,
          message: 'successfully edited post'
        }
      })
    })
  })
})

Router.delete('/:slug', passport.authenticate('jwt', {
  session: false
}), ({ params, user }, res) => {
  Post.findOneAndRemove({ slug: params.slug }, (postErr, post) => {
    if (postErr) {
      console.log(postErr.toJSON())

      return res.status(400).json({
        status: {
          success: false,
          message: 'something went wrong. could\'t delete post'
        }
      })
    }

    if (!post) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'could\'t delete post. inexsistent'
        }
      })
    }

    if (post.meta.author.toString() !== user._id.toString()) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'You do not own this post'
        }
      })
    }

    return User.findOne({ _id: user._id }, (postUserErr, postUser) => {
      if (postUserErr) {
        console.log(postUserErr.toJSON())
      }

      const self = postUser

      self.posts = user.posts.splice(self.posts.indexOf(post._id), 1)

      return self.save(saveErr => {
        if (saveErr) return res.send(saveErr)

        return res.json({
          status: {
            success: true,
            message: 'successfully deleted post'
          }
        })
      })
    })
  })
})

Router.put('unpublish/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { raw, meta, html }, params, user }, res) => {
  const slug = titleSlugger(meta.title)
  const newDraft = new Draft({
    raw,
    html,
    slug,
    meta: Object.assign(meta, { author: user._id })
  })

  Post.findOneAndRemove({ slug: params.slug }, (postErr, post) => {
    if (postErr) {
      console.log(postErr.toJSON())

      return res.status(400).json({
        status: {
          success: false,
          message: 'something went wrong. could\'t delete post'
        }
      })
    }

    if (!post) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'could\'t delete post. inexsistent'
        }
      })
    }

    if (post.meta.author.toString() !== user._id.toString()) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'You do not own this post'
        }
      })
    }

    return User.findOne({ _id: user._id }, (postUserErr, postUser) => {
      if (postUserErr) {
        console.log(postUserErr.toJSON())
      }

      const self = postUser

      self.posts = user.posts.splice(self.posts.indexOf(post._id), 1)

      return self.save(saveErr => {
        if (saveErr) return res.send(saveErr)

        return newDraft.save(draftSaveErr => {
          if (draftSaveErr) return res.send(draftSaveErr)

          return res.json({
            status: {
              success: true,
              message: 'successfully unpublished post'
            }
          })
        })
      })
    })
  })
})

module.exports = Router

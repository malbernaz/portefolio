const passport = require('passport')

const { User, Post } = require('../models')
const { titleSlugger } = require('../helpers')

const Router = new require('express').Router() //  eslint-disable-line

Router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return res.send(err)
    if (posts.length < 1) {
      return res.send({
        status: {
          success: false,
          message: 'There are no posts yet'
        }
      })
    }
    return res.json(posts)
  })
})

Router.get('/:slug', ({ params: { slug } }, res) => {
  Post.findOne({ slug }, (err, post) => {
    if (!post) {
      return res.status(404).send({
        status: {
          success: false,
          message: 'page not found'
        }
      })
    }
    return res.json(post)
  })
})

Router.post('/', passport.authenticate('jwt', {
  session: false
}), ({ body: { title, subtitle, body }, user }, res) => {
  const newPost = new Post({
    title,
    subtitle,
    body,
    author: user._id,
    slug: title
  })
  const slug = titleSlugger(newPost.title)
  Post.findOne({ slug }, (postErr, post) => {
    if (post) {
      return res.json({
        status: {
          success: false,
          message: 'The title produces an existent slug'
        }
      })
    }
    return User.findOne({ _id: user._id }, (userErr, newUser) => {
      if (userErr) return res.send(userErr)
      const self = newUser
      self.posts.push(newPost._id)
      return self.save(newUserErr => {
        if (newUserErr) return res.send(newUserErr)
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

Router.put('/:slug', passport.authenticate('jwt', {
  session: false,
}), ({ body: { title, subtitle, body }, params, user }, res) => {
  Post.findOne({ slug: params.slug }, (PostErr, post) => {
    if (PostErr) {
      console.log(PostErr.toJSON())
      throw PostErr
    }
    if (post.author.toString() !== user._id.toString()) {
      return res.json({
        status: {
          success: false,
          message: 'You do not own this post'
        }
      })
    }
    const self = post
    self.title = title !== '' ? title : post.title
    self.subtitle = subtitle !== '' ? subtitle : post.subtitle
    self.body = body !== '' ? body : post.body
    self.slug = title !== '' ? title : post.title
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
  Post.findOneAndRemove({ slug: params.slug }, (err, post) => {
    if (err) return res.send(err)
    if (post.author.toString() !== user._id.toString()) {
      return res.json({
        status: {
          success: false,
          message: 'You do not own this post'
        }
      })
    }
    return res.json({
      status: {
        success: true,
        message: 'successfully deleted post'
      }
    })
  })
})

module.exports = Router

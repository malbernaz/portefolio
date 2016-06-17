import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import moment from 'moment'

const Post = ({ posts, slug }) => {
  const post = posts.filter(p => p.slug === slug)[0]
  return (
    <section className="post">
      <Helmet title={post.title} />
      <article>
        <small>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</small>
        <h2>{post.title}</h2>
        <h3>{post.subtitle}</h3>
        <p>{post.body}</p>
      </article>
    </section>
  )
}

Post.propTypes = {
  posts: PropTypes.array,
  slug: PropTypes.string
}

export default connect(
  ({ posts: { posts } }, { params: { slug } }) => ({ posts, slug })
)(Post)

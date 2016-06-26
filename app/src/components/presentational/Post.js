import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import moment from 'moment'

const Post = ({ posts, slug }) => {
  const { meta, html, createdAt } = posts.filter(p => p.slug === slug)[0]
  return (
    <section className="post">
      <Helmet title={ meta.title } />
      <article>
        <small>{ moment(createdAt, 'YYYYMMDD').fromNow() }</small>
        <h2>{ meta.title }</h2>
        <h3>{ meta.subtitle }</h3>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
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

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import moment from 'moment'

const Post = ({ posts, slug }) => {
  const { meta, html, createdAt } = posts.filter(p => p.slug === slug)[0]

  return (
    <section className="post">
      <Helmet title={ meta.title } />
      <article className="post-display">
        <small className="post-display__stamp">{ moment(createdAt, 'YYYYMMDD').fromNow() }</small>
        <h2 className="post-display__title">{ meta.title }</h2>
        <h3 className="post-display__subtitle">{ meta.subtitle }</h3>
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

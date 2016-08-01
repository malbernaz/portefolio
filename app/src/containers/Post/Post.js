import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './Post.scss'

const Post = ({ posts, slug }) => {
  const { meta, html, createdAt } = posts.filter(p => p.slug === slug)[0]

  return (
    <section className={ s.root }>
      <Helmet title={ meta.title.toUpperCase() } />
      <div className={ s.wrapper }>
        <article>
          <small>{ moment(createdAt, moment.ISO_8601).fromNow() }</small>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </section>
  )
}

Post.propTypes = {
  posts: PropTypes.array,
  slug: PropTypes.string
}

export default connect(
  (state, props) => ({
    posts: state.posts.posts,
    slug: props.params.slug
  })
)(withStyles(s)(Post))

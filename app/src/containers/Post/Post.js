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
      <Helmet title={ meta.title } />
      <div className={ s.wrapper }>
        <article>
          <small>{ moment(createdAt, 'YYYYMMDD').fromNow() }</small>
          <h2 className={ s.title }>{ meta.title }</h2>
          <h3 className={ s.description }>{ meta.description }</h3>
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

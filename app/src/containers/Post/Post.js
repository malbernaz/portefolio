import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Wrapper from '../../components/Wrapper/Wrapper'
import s from './Post.scss'

const Post = ({ posts, slug }) => {
  const { meta, html, createdAt } = posts.filter(p => p.slug === slug)[0]

  return (
    <Wrapper>
      <Helmet
        title={ meta.title.toUpperCase() }
        meta={ [{
          name: 'description',
          content: meta.description
        }, {
          name: 'keywords',
          content: meta.tags.join(',')
        }] }
      />
      <div className={ s.root }>
        <article>
          <small>{ moment(createdAt, moment.ISO_8601).fromNow() }</small>
          <h1>{ meta.title }</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </Wrapper>
  )
}

Post.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string
}

const mapStateToProps = ({ posts: { posts } }, { params: { slug } }) => ({
  posts,
  slug
})

export default connect(mapStateToProps)(withStyles(s)(Post))

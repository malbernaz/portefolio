import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import postsOrderedByCreatedAt from '../../selectors/postsOrderedByCreatedAt'
import s from './Posts.scss'

const Posts = ({ posts }) => (
  <div className={ s.root }>
    { posts.length > 0 ?
      posts.map((post, index) => (
        <article key={ index } className={ s.post }>
          <small className={ s.stamp }>
            { moment(post.createdAt, moment.ISO_8601).fromNow() }
          </small>
          <h2 className={ s.title }>{ post.meta.title }</h2>
          <h3 className={ s.subtitle }>{ post.meta.subtitle }</h3>
          <Link className={ s.more } to={ `/posts/${post.slug}` }>read more</Link>
        </article>
      )) :
      <article>There ain't no posts yet :(</article> }
  </div>
)

Posts.propTypes = {
  posts: PropTypes.array
}

export default connect(
  state => ({
    posts: postsOrderedByCreatedAt(state)
  })
)(withStyles(s)(Posts))
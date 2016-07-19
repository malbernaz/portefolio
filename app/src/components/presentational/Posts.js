import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import postsOrderedByCreatedAt from '../../selectors/postsOrderedByCreatedAt'

const Posts = ({ posts }) => (
  <div className="posts-display">
    { posts.length > 0 ?
      posts.map((post, index) => (
        <article key={ index } className="post-display">
          <small className="post-display__stamp">
            { moment(post.createdAt, moment.ISO_8601).fromNow() }
          </small>
          <h2 className="post-display__title">{ post.meta.title }</h2>
          <h3 className="post-display__subtitle">{ post.meta.subtitle }</h3>
          <Link to={ `/posts/${post.slug}` }>read more...</Link>
        </article>
      )) :
      <article>There ain't no posts yet :(</article> }
  </div>
)

Posts.propTypes = {
  posts: PropTypes.array
}

export default connect(
  state => ({ posts: postsOrderedByCreatedAt(state) })
)(Posts)

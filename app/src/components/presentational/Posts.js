import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import { postsOrderedByCreatedAt } from '../../selectors'

const Posts = ({ posts }) => (
  <div>
    { posts.length > 0 ?
      posts.map((post, index) => (
        <article key={ index }>
          <small>{ moment(post.createdAt, moment.ISO_8601).fromNow() }</small>
          <h2>{ post.meta.title }</h2>
          <h3>{ post.meta.subtitle }</h3>
          <Link to={ `/posts/${post.slug}` }>more...</Link>
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

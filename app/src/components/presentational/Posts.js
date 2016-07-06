import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const Posts = ({ posts: { posts } }) => (
  <div>
    { posts.length > 0 ?
      posts.map((post, index) => (
        <article key={ index }>
          <small>{ moment(post.createdAt, moment.ISO_8601).fromNow() }</small>
          <h2>{ post.meta.title }</h2>
          <h3>{ post.meta.subtitle }</h3>
        </article>
      )).reverse() :
      <article>There ain't no posts yet :(</article> }
  </div>
)

Posts.propTypes = {
  posts: PropTypes.object
}

export default connect(
  state => ({ posts: state.posts })
)(Posts)

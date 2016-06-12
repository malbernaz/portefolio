import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import moment from 'moment'

const Home = ({ posts: { posts } }) => (
  <div>
    <Helmet title="home" />
    home
    {posts.map((post, index) => (
      <article key={index}>
        <h2>{post.title}</h2>
        <h3>{post.subtitle}</h3>
        <small>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</small>
        <p>{post.body}</p>
      </article>
    ))}
  </div>
)

Home.propTypes = {
  posts: PropTypes.object
}

export default connect(
  state => ({ ...state })
)(Home)

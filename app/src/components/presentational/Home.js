import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import moment from 'moment'

const Home = ({ posts: { posts } }) => (
  <div className="home">
    <Helmet title="home" />
    {posts.map((post, index) => (
      <article key={index}>
        <small>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</small>
        <h2>{post.title}</h2>
        <h3>{post.subtitle}</h3>
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

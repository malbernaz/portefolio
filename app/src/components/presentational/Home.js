import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import moment from 'moment'

const Home = ({ posts: { posts } }) => (
  <div className="home">
    <Helmet title="home" />
    {posts ?
      posts.map((post, index) => (
        <article key={index}>
          <small>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</small>
          <h2>{post.meta.title}</h2>
          <h3>{post.meta.subtitle}</h3>
          <Link to={`/posts/${post.slug}`}>see more ...</Link>
        </article>
      )).reverse() :
      <article>
        no posts :(
      </article>
    }
  </div>
)

Home.propTypes = {
  posts: PropTypes.object
}

export default connect(
  state => ({ ...state })
)(Home)

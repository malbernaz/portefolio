import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'
import moment from 'moment'

import { Icon, MyEditor } from '../'

import { posts as postsActions } from '../../actions/posts'

const Admin = ({ posts: { posts, html, title, createdAt } }) => (
  <section className="admin">
    <Helmet title="admin" />
    <div className="editor">
      <div className="top-admin-bar">
        <a href="#" className="top-bar-button show-posts-list">
          <Icon name="list" />
          <span>posts</span>
        </a>
        <div className="post-title">
          <div className="title">
            <b>{title !== undefined ? title : 'Undefined'}</b>
          </div>
          <small>created {moment().subtract(createdAt, 'days').calendar()}</small>
        </div>
        <a href="#" className="top-bar-button">
          <Icon name="rocket" />
          <span>publish</span>
        </a>
      </div>
      <div className="panes">
        <div className="posts-list">
          {
            posts.map((p, i) =>
              <div className="post-item" key={i}>
                <small>{p.title}</small>
                <div className="post-actions">
                  <a className="post-action" href="#">
                    <Icon name="edit" />
                  </a>
                  <a className="post-action" href="#">
                    <Icon name="close" />
                  </a>
                </div>
              </div>
            )
          }
        </div>
        <div className="code">
          <MyEditor />
        </div>
        <div
          className="preview"
          dangerouslySetInnerHTML={{
            __html: html
          }}
        >
        </div>
      </div>
      <div className="bottom-admin-bar">
        <a href="#" className="bottom-bar-button">
          <Icon name="list" />
          <span>posts</span>
        </a>
        <a href="#" className="bottom-bar-button">
          <Icon name="edit" />
          <span>edit</span>
        </a>
        <a href="#" className="bottom-bar-button">
          <Icon name="preview" />
          <span>preview</span>
        </a>
      </div>
    </div>
  </section>
)

Admin.propTypes = {
  posts: PropTypes.object,
  draft: PropTypes.string
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({ ...postsActions }, dispatch))(Admin)

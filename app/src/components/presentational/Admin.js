import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'
import moment from 'moment'
import { browserHistory } from 'react-router'

import { Icon, MyEditor } from '../'

import { posts as postsActions } from '../../actions'

const Admin = ({ posts: { posts, draft }, publishDraft, loadPosts }) => {
  const handleSubmit = e => {
    e.preventDefault()

    return publishDraft(draft)
      .then(loadPosts)
      .catch(loadPosts)
      .then(() => browserHistory.push('/'))
      .catch(() => browserHistory.push('/'))
  }

  return (
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
              <b>{draft.meta.title}</b>
            </div>
            <small>
              created {moment().subtract(new Date(), 'days').calendar()}
            </small>
          </div>
          <a href="#" onClick={e => handleSubmit(e)} className="top-bar-button">
            <Icon name="rocket" />
            <span>publish</span>
          </a>
        </div>
        <div className="panes">
          <div className="posts-list">
            {
              posts ?
                posts.map((p, i) =>
                  <div className="post-item" key={i}>
                    <small>{p.title}</small>
                    <div className="post-actions">
                      <a className="post-action edit" href="#">
                        <Icon name="edit" />
                      </a>
                      <a className="post-action delete" href="#">
                        <Icon name="close" />
                      </a>
                    </div>
                  </div>
                ).reverse() : <div className="post-item">no posts yet :(</div>
            }
          </div>
          <div className="code">
            <MyEditor />
          </div>
          <div
            className="preview"
            dangerouslySetInnerHTML={{
              __html: `<h2>${draft.meta.title}</h2><h3>${draft.meta.subtitle}</h3>${draft.html}`
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
}

Admin.propTypes = {
  posts: PropTypes.object,
  publishDraft: PropTypes.func,
  loadPosts: PropTypes.func
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({ ...postsActions }, dispatch))(Admin)

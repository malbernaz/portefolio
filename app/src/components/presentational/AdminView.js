import React, { PropTypes } from 'react'

import moment from 'moment'

import { Icon, MyEditor, DropdownButton } from '../'

const AdminView = ({ posts, activeDraft, handleSubmit, handleEdit, handleDelete }) => (
  <section className="admin">
    <div className="editor">
      <div className="top-admin-bar">
        <a href="#" className="top-bar-button show-posts-list">
          <Icon name="list" />
          <span>posts</span>
        </a>
        <div className="post-title">
          <div className="title">
            <b>{activeDraft.meta.title}</b>
          </div>
          <small>
            updated {moment().subtract(new Date(), 'days').calendar()}
          </small>
        </div>
        <DropdownButton
          options={activeDraft.slug === null ? [
            { label: 'publish', action: handleSubmit },
            { label: 'save draft', action: handleSubmit }
          ] : [
            { label: 'update', action: handleEdit },
            { label: 'unpublish', action: handleSubmit }
          ]}
          fixedOptions={[
            { label: 'new post', action: handleSubmit },
            { label: 'delete', action: handleDelete }
          ]}
        />
      </div>
      <div className="panes">
        <div className="posts-list">
          {
            posts ?
              posts.map((p, i) =>
                <div className="post-item" key={i}>
                  <small>{p.meta.title}</small>
                  <div className="post-actions">
                    <a onClick={e => handleEdit(e, p)} className="post-action edit" href="#">
                      <Icon name="edit" />
                    </a>
                    <a
                      onClick={e => handleDelete(e, p.slug)}
                      className="post-action delete"
                      href="#"
                    >
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
            __html: `
              <h2>
                ${activeDraft.meta.title}
              </h2>
              <h3>
                ${activeDraft.meta.subtitle}
              </h3>
              ${activeDraft.html}
            `
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

AdminView.propTypes = {
  posts: PropTypes.array,
  activeDraft: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default AdminView

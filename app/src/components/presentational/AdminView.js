import React, { PropTypes } from 'react'

import moment from 'moment'

import { Icon, MyEditor, EditorSidebar, DropdownButton } from '../'

const AdminView = ({
  activeDraft,
  drafts,
  handleDelete,
  handleEdit,
  handleSubmit,
  handleUnpublish,
  posts
}) => (
  <section className="admin">
    <div className="editor">
      <div className="top-admin-bar">
        <a href="#" className="top-bar-button show-posts-list">
          <Icon name="list" />
          <span>posts</span>
        </a>
        <div className="post-title">
          <div className="title">
            <b>{ activeDraft.meta.title }</b>
          </div>
          <small>
            updated { moment().subtract(new Date(), 'days').calendar() }
          </small>
        </div>
        <DropdownButton
          options={ activeDraft.isPublished ? [
            { label: 'update', action: handleSubmit },
            { label: 'unpublish', action: handleUnpublish }
          ] : [
            { label: 'publish', action: handleSubmit },
            { label: 'save draft', action: handleSubmit }
          ] }
          fixedOptions={ activeDraft.isSaved ? [
            { label: 'new post', action: handleSubmit },
            { label: 'delete', action: handleDelete }
          ] : [] }
        />
      </div>
      <div className="panes">
        <EditorSidebar
          drafts={ drafts }
          posts={ posts }
          handleEdit={ handleEdit }
          handleDelete={ handleDelete }
        />
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
  activeDraft: PropTypes.object.isRequired,
  drafts: PropTypes.array,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUnpublish: PropTypes.func.isRequired,
  posts: PropTypes.array
}

export default AdminView

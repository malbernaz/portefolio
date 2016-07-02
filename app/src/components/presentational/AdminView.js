import React, { PropTypes } from 'react'

import moment from 'moment'

import { Icon, MyEditor, EditorSidebar, DropdownButton } from '../'

const AdminView = ({
  activeDraft,
  drafts,
  handleDelete,
  handleEditPost,
  handleNewPost,
  handlePublish,
  handleSaveDraft,
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
            updated { moment().subtract(
               activeDraft.updatedAt ? activeDraft.updatedAt : new Date(), 'days').calendar() }
          </small>
        </div>
        <DropdownButton
          options={ activeDraft.isPublished ? [
            { label: 'update', action: handlePublish },
            { label: 'unpublish', action: handleUnpublish }
          ] : [
            { label: 'publish', action: handlePublish },
            { label: 'save draft', action: handleSaveDraft }
          ] }
          fixedOptions={ activeDraft.isSaved ? [
            { label: 'new post', action: handleNewPost },
            { label: 'delete', action: handleDelete }
          ] : [] }
        />
      </div>
      <div className="panes">
        <EditorSidebar
          drafts={ drafts }
          posts={ posts }
          handleEditPost={ handleEditPost }
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
  handleEditPost: PropTypes.func.isRequired,
  handleNewPost: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleSaveDraft: PropTypes.func.isRequired,
  handleUnpublish: PropTypes.func.isRequired,
  posts: PropTypes.array
}

export default AdminView

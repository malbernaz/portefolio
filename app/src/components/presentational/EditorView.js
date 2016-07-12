import React, { PropTypes } from 'react'

import moment from 'moment'

import { Icon, Codemirror, EditorNav, DropdownButton } from '../'

const EditorView = ({
  activeDraft,
  handleDelete,
  handleEditPost,
  handleNewPost,
  handlePublish,
  handleSaveDraft,
  handleUnpublish,
}) => (
  <section className="editor">
    <div className="editor-top-bar">
      <a href="#" className="editor-top-bar__button--show-posts">
        <Icon name="list" />
        <span>posts</span>
      </a>
      <div className="editor-top-bar__info">
        <div className="editor-top-bar__info__title">
          <b>{ activeDraft.meta.title }</b>
        </div>
        <small className="editor-top-bar__info__stamps">
          updated { activeDraft.updatedAt ?
            moment(activeDraft.updatedAt, moment.ISO_8601).subtract('days').calendar() :
            moment(new Date()).subtract('days').calendar() }
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
    <div className="editor-panes">
      <EditorNav
        handleEditPost={ handleEditPost }
        handleDelete={ handleDelete }
      />
      <div className="editor-panes__code">
        <Codemirror />
      </div>
      <div className="editor-panes__preview">
        <article
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
        </article>
      </div>
    </div>
    <div className="editor-bottom-bar">
      <a href="#" className="editor-bottom-bar__button">
        <Icon name="list" />
        <span>posts</span>
      </a>
      <a href="#" className="editor-bottom-bar__button">
        <Icon name="edit" />
        <span>edit</span>
      </a>
      <a href="#" className="editor-bottom-bar__button">
        <Icon name="preview" />
        <span>preview</span>
      </a>
    </div>
  </section>
)

EditorView.propTypes = {
  activeDraft: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  handleNewPost: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleSaveDraft: PropTypes.func.isRequired,
  handleUnpublish: PropTypes.func.isRequired,
}

export default EditorView
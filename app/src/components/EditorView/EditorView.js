import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import { Icon, EditorNav, DropdownButton } from '../'
import { Codemirror } from '../../containers'
import s from './EditorView.scss'

const EditorView = ({
  activeDraft,
  dropdownIsShown,
  editorView,
  handleDelete,
  handleEditPost,
  handleNewPost,
  handlePublish,
  handleSaveDraft,
  handleUnpublish,
  iterablePosts,
  navIsShown,
  switchEditorView,
  toggleDropdown,
  toggleNav
}) => (
  <section className={ s.root }>
    <div className={ s.topBar }>
      <a href="#" onClick={ e => toggleNav(e) } className={ s.topBarBtnPosts }>
        <Icon name="list" />
        <span>posts</span>
      </a>
      <div className={ s.info }>
        <div className={ s.infoTitle }>
          <b>{ activeDraft.meta.title }</b>
        </div>
        <small className={ s.infoStamps }>
          updated { activeDraft.updatedAt ?
            moment(activeDraft.updatedAt, moment.ISO_8601).subtract('days').calendar() :
            moment(new Date()).subtract('days').calendar() }
        </small>
      </div>
      <DropdownButton
        isShown={ dropdownIsShown }
        toggleDropdown={ toggleDropdown }
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
    <div className={ s.panes }>
      <EditorNav
        toggle={ toggleNav }
        handleEditPost={ handleEditPost }
        handleDelete={ handleDelete }
        isShown={ navIsShown }
        iterablePosts={ iterablePosts }
      />
      <div className={ editorView === 'code' ? s.panesView : s.panesViewOnPreview }>
        <div className={ s.code }>
          <Codemirror />
        </div>
        <div className={ s.preview }>
          <article
            dangerouslySetInnerHTML={{
              __html: `
                <h2>${activeDraft.meta.title}</h2>
                <h3>${activeDraft.meta.description}</h3>
                ${activeDraft.html}
              `
            }}
          />
        </div>
      </div>
    </div>
    <div className={ s.bottomBar }>
      <a href="#" onClick={ e => toggleNav(e) } className={ s.bottomBarBtn }>
        <Icon name="list" />
        <span>posts</span>
      </a>
      <a href="#" onClick={ e => switchEditorView(e, 'code') } className={ s.bottomBarBtn }>
        <Icon name="edit" />
        <span>edit</span>
      </a>
      <a href="#" onClick={ e => switchEditorView(e, 'preview') } className={ s.bottomBarBtn }>
        <Icon name="preview" />
        <span>preview</span>
      </a>
    </div>
  </section>
)

EditorView.propTypes = {
  activeDraft: PropTypes.object.isRequired,
  dropdownIsShown: PropTypes.bool.isRequired,
  editorView: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  handleNewPost: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleSaveDraft: PropTypes.func.isRequired,
  handleUnpublish: PropTypes.func.isRequired,
  iterablePosts: PropTypes.array.isRequired,
  navIsShown: PropTypes.bool.isRequired,
  switchEditorView: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired
}

export default withStyles(s)(EditorView)

import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import Helmet from 'react-helmet'

import { Icon, Editor, EditorNav, DropdownButton } from '../'
import s from './EditorView.scss'

const EditorView = ({
  activeDraft,
  creatingActiveDraft,
  dropdownIsShown,
  editorView,
  handleChange,
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
  toggleEditorNav,
  toggleNav,
  toggleSettings
}) =>
  <section className={ s.root }>
    <Helmet title="EDITOR" />
    <div className={ s.topBar }>
      <a className={ s.menuToggleBtn } onClick={ toggleNav }>
        <Icon name="menu" />
      </a>
      <div className={ s.info }>
        <a className={ s.infoTitle } onClick={ toggleSettings }>
          <b>
            { Object.hasOwnProperty.call(activeDraft, 'meta') &&
              Object.hasOwnProperty.call(activeDraft.meta, 'title') ?
                activeDraft.meta.title :
                'my post title' }
          </b>
          <Icon name="settings" />
        </a>
        <small className={ s.infoStamps }>
          updated { Object.hasOwnProperty.call(activeDraft, 'updatedAt') ?
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
      <div className={ editorView === 'code' ? s.panesView : s.panesViewOnPreview }>
        <div className={ s.pane }>
          <Editor
            activeDraft={ activeDraft }
            creatingActiveDraft={ creatingActiveDraft }
            updateActiveDraft={ handleChange }
          />
        </div>
        <div className={ s.pane }>
          <div className={ s.preview }>
            <article dangerouslySetInnerHTML={{ __html: activeDraft.html }} />
          </div>
        </div>
      </div>
    </div>
    <div className={ s.bottomBar }>
      <a onClick={ toggleEditorNav } className={ s.bottomBarBtn }>
        <Icon name="list" />
        <span>posts</span>
      </a>
      <a onClick={ e => switchEditorView(e, 'code') } className={ s.bottomBarBtn }>
        <Icon name="edit" />
        <span>edit</span>
      </a>
      <a onClick={ e => switchEditorView(e, 'preview') } className={ s.bottomBarBtn }>
        <Icon name="preview" />
        <span>preview</span>
      </a>
    </div>
    <EditorNav
      toggle={ toggleEditorNav }
      handleEditPost={ handleEditPost }
      handleDelete={ handleDelete }
      isShown={ navIsShown }
      iterablePosts={ iterablePosts }
    />
  </section>

EditorView.propTypes = {
  activeDraft: PropTypes.object.isRequired,
  creatingActiveDraft: PropTypes.bool.isRequired,
  dropdownIsShown: PropTypes.bool.isRequired,
  editorView: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  handleNewPost: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleSaveDraft: PropTypes.func.isRequired,
  handleUnpublish: PropTypes.func.isRequired,
  iterablePosts: PropTypes.array.isRequired,
  navIsShown: PropTypes.bool.isRequired,
  settingIsShown: PropTypes.bool.isRequired,
  switchEditorView: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  toggleEditorNav: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired
}

export default withStyles(s)(EditorView)

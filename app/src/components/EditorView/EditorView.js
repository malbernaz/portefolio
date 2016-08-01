import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import { Icon, EditorNav, DropdownButton, EditorSettings } from '../'
import { Codemirror } from '../../containers'
import s from './EditorView.scss'

const EditorView = ({
  activeDraft,
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
  settingIsShown,
  switchEditorView,
  toggleDropdown,
  toggleNav,
  toggleSettings
}) => (
  <section className={ s.root }>
    <EditorSettings
      meta={ activeDraft.meta }
      handleChange={ handleChange }
      isShown={ settingIsShown }
      toggle={ toggleSettings }
    />
    <div className={ s.topBar }>
      <a href="#" onClick={ e => toggleNav(e) } className={ s.topBarBtnPosts }>
        <Icon name="list" />
        <span>posts</span>
      </a>
      <div className={ s.info }>
        <a href="#" className={ s.infoTitle } onClick={ e => toggleSettings(e) }>
          <b>
            { activeDraft.hasOwnProperty('meta') &&
              activeDraft.meta.hasOwnProperty('title') ?
                activeDraft.meta.title :
                'my post title' }
          </b>
          <Icon name="settings" />
        </a>
        <small className={ s.infoStamps }>
          updated { activeDraft.hasOwnProperty('updatedAt') ?
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
          <article dangerouslySetInnerHTML={{ __html: activeDraft.html }} />
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
  toggleNav: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired
}

export default withStyles(s)(EditorView)

import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import Helmet from 'react-helmet'

import Icon from '../Icon'
import Editor from '../Editor/Editor'
import EditorNav from '../EditorNav/EditorNav'
import DropdownButton from '../DropdownButton/DropdownButton'
import EditorSettings from '../EditorSettings/EditorSettings'

import s from './EditorView.scss'

const { arrayOf, bool, func, object, shape, string } = PropTypes

@withStyles(s)
export default class EditorView extends Component {
  static propTypes = {
    activeDraft: shape({ meta: shape({ title: string.isRequired }) }).isRequired,
    bottomBarIsShown: bool.isRequired,
    dropdownIsShown: bool.isRequired,
    editorFocused: bool.isRequired,
    editorView: string.isRequired,
    handleChange: func.isRequired,
    handleDelete: func.isRequired,
    handleEditPost: func.isRequired,
    handleNewPost: func.isRequired,
    handlePublish: func.isRequired,
    handleSaveDraft: func.isRequired,
    handleUnpublish: func.isRequired,
    iterablePosts: arrayOf(object).isRequired,
    navIsShown: bool.isRequired,
    settingIsShown: bool.isRequired,
    switchEditorFocus: func.isRequired,
    switchEditorView: func.isRequired,
    toggleDropdown: func.isRequired,
    toggleEditorNav: func.isRequired,
    toggleNav: func.isRequired,
    toggleSettings: func.isRequired,
    updateActiveDraft: func.isRequired
  }

  componentDidMount () {
    this.panesView.className = this.props.editorView === 'code' ?
      s.panesView :
      s.panesViewOnPreview
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.editorView !== this.props.editorView) {
      this.flipPanesView()
    }
  }

  flipPanesView = () => {
    const { className } = this.panesView

    this.panesView.className = className === s.panesView ? s.panesViewOnPreview : s.panesView

    const first = this.panesView.getBoundingClientRect()

    this.panesView.className = className === s.panesView ? s.panesView : s.panesViewOnPreview

    const last = this.panesView.getBoundingClientRect()

    const invert = first.right - last.right

    this.panesView.style.transition = 'transform .3s cubic-bezier(0,0,0.32,1)'

    requestAnimationFrame(() => {
      this.panesView.style.transform = `translateX(${invert}px)`
    })

    this.panesView.addEventListener('transitionend', () => {
      this.panesView.className = className === s.panesView ? s.panesViewOnPreview : s.panesView

      this.panesView.style.transition = ''
      this.panesView.style.transform = ''
    })
  }

  render () {
    const {
      activeDraft,
      bottomBarIsShown,
      dropdownIsShown,
      editorFocused,
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
      switchEditorFocus,
      switchEditorView,
      toggleDropdown,
      toggleEditorNav,
      toggleNav,
      toggleSettings,
      updateActiveDraft
    } = this.props

    return (
      <section className={ s.root }>
        <Helmet title="EDITOR" />
        <EditorSettings
          handleChange={ handleChange }
          isShown={ settingIsShown }
          meta={ activeDraft.meta }
          toggle={ toggleSettings }
        />
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
            fixedOptions={ activeDraft.isSaved ? [
              { label: 'new post', action: handleNewPost },
              { label: 'delete', action: handleDelete }
            ] : [] }
            options={ activeDraft.isPublished ? [
              { label: 'update', action: handlePublish },
              { label: 'unpublish', action: handleUnpublish }
            ] : [
              { label: 'publish', action: handlePublish },
              { label: 'save draft', action: handleSaveDraft }
            ] }
            toggleDropdown={ toggleDropdown }
          />
        </div>
        <div className={ s.panes }>
          <div className={ s.panesView } ref={ c => { this.panesView = c } }>
            <div className={ s.pane }>
              <Editor
                activeDraft={ activeDraft }
                editorFocused={ editorFocused }
                editorView={ editorView }
                switchEditorFocus={ switchEditorFocus }
                updateActiveDraft={ updateActiveDraft }
              />
            </div>
            <div className={ s.pane }>
              <div className={ s.preview }>
                <article>
                  <h1>{ activeDraft.meta.title }</h1>
                  <div dangerouslySetInnerHTML={{ __html: activeDraft.html }} />
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className={ bottomBarIsShown ? s.bottomBar : s.bottomBarHidden }>
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
          handleDelete={ handleDelete }
          handleEditPost={ handleEditPost }
          isShown={ navIsShown }
          iterablePosts={ iterablePosts }
          toggle={ toggleEditorNav }
        />
      </section>
    )
  }
}

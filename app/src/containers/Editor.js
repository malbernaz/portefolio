import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import EditorView from '../components/EditorView/EditorView'
import editablePostsSelector from '../selectors/editablePostsSelector'
import * as postsActions from '../actions/posts'
import * as messageActions from '../actions/message'
import * as editorActions from '../actions/ui/editor'
import * as navActions from '../actions/ui/nav'

const { array, arrayOf, bool, func, object, shape, string } = PropTypes

const mapStateToProps = state => ({
  posts: state.posts,
  message: state.message,
  editor: state.ui.editor,
  iterablePosts: editablePostsSelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...postsActions,
  ...messageActions,
  ...editorActions,
  ...navActions
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Editor extends Component {
  static propTypes = {
    createActiveDraft: func,
    deleteDraft: func,
    deletePost: func,
    editor: shape({
      editorBottomBarIsVisible: bool,
      editorDropdownIsVisible: bool,
      editorFocused: bool,
      editorNavIsVisible: bool,
      editorSettingsIsVisible: bool,
      view: string
    }),
    iterablePosts: arrayOf(object),
    posts: shape({
      activeDraft: object,
      drafts: array,
      posts: array
    }),
    publish: func,
    saveDraft: func,
    showMessage: func,
    switchEditorFocus: func,
    switchView: func,
    toggleEditorDropdown: func,
    toggleEditorNav: func,
    toggleEditorSettings: func,
    toggleNav: func,
    unpublish: func,
    updateActiveDraft: func,
    updateDraft: func,
    updatePost: func
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleShortcuts, false)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleShortcuts, false)
  }

  // POSTS CRUD
  submitPromise = (promise, data) => {
    const {
      showMessage,
      toggleEditorDropdown,
      toggleEditorNav,
      editor: {
        editorDropdownIsVisible,
        editorNavIsVisible
      }
    } = this.props

    if (editorDropdownIsVisible) toggleEditorDropdown()

    if (editorNavIsVisible) toggleEditorNav()

    return promise(data)
      .then(({ message }) => showMessage(message))
      .catch(({ message }) => showMessage(message))
  }

  handleNewPost = e => {
    e.preventDefault()

    const { createActiveDraft } = this.props

    return createActiveDraft()
  }

  handlePublish = e => {
    e.preventDefault()

    const { updatePost, publish, posts: { activeDraft } } = this.props

    return !activeDraft.isPublished ?
      this.submitPromise(publish, activeDraft) :
      this.submitPromise(updatePost, activeDraft)
  }

  handleUnpublish = e => {
    e.preventDefault()

    const { unpublish, posts: { activeDraft } } = this.props

    return this.submitPromise(unpublish, activeDraft)
  }

  handleSaveDraft = e => {
    e.preventDefault()

    const { saveDraft, updateDraft, posts: { activeDraft } } = this.props

    return !activeDraft.isSaved ?
      this.submitPromise(saveDraft, activeDraft) :
      this.submitPromise(updateDraft, activeDraft)
  }

  handleDelete = (e, _id) => {
    e.preventDefault()

    const {
      deletePost,
      deleteDraft,
      posts: {
        activeDraft,
        drafts,
        posts
      }
    } = this.props

    if (_id) {
      const toDelete =
        drafts.filter(d => d._id === _id)[0] ||
        posts.filter(d => d._id === _id)[0]

      return !toDelete.isPublished && toDelete.isSaved ?
        this.submitPromise(deleteDraft, _id) :
        this.submitPromise(deletePost, _id)
    }

    return !activeDraft.isPublished && activeDraft.isSaved ?
      this.submitPromise(deleteDraft, activeDraft._id) :
      this.submitPromise(deletePost, activeDraft._id)
  }

  handleChange = e => {
    const { updateActiveDraft } = this.props
    const { name, value } = e.target
    const meta = {}

    if (name === 'tags') {
      meta[name] = value.split(', ')
    } else {
      meta[name] = value
    }

    updateActiveDraft({ meta })
  }

  // UI INTERACTIONS
  handleEditPost = (e, newActiveDraft) => {
    e.preventDefault()

    const { createActiveDraft, toggleEditorNav } = this.props

    toggleEditorNav()

    createActiveDraft(newActiveDraft)
  }

  handleShortcuts = e => {
    const { editor: { view }, switchEditorFocus, toggleEditorSettings } = this.props

    switch (e.keyCode) {
      case 39:
        if (view === 'code' && e.shiftKey && e.metaKey) {
          e.preventDefault()

          this.switchEditorView(e, 'preview')
        }

        break
      case 37:
        if (view === 'preview' && e.shiftKey && e.metaKey) {
          e.preventDefault()

          this.switchEditorView(e, 'code')

          switchEditorFocus(true)
        }

        break
      case 70:
        if (e.shiftKey && e.metaKey) {
          e.preventDefault()

          if (view === 'preview') {
            this.switchEditorView(e, 'code')
          }

          switchEditorFocus(true)
        }

        break
      case 79:
        if (e.shiftKey && e.metaKey) {
          e.preventDefault()

          toggleEditorSettings()
        }

        break
      default:
        break
    }
  }

  toggleGlobalNav = e => {
    e.preventDefault()

    const { toggleNav } = this.props

    toggleNav()
  }

  toggleEditorNav = e => {
    e.preventDefault()

    const { toggleEditorNav } = this.props

    toggleEditorNav()
  }

  toggleDropdown = e => {
    e.preventDefault()

    const { toggleEditorDropdown } = this.props

    toggleEditorDropdown()
  }

  toggleSettings = () => {
    const { toggleEditorSettings } = this.props

    toggleEditorSettings()
  }

  switchEditorView = (e, view) => {
    e.preventDefault()

    const { switchView } = this.props

    switchView(view)
  }

  render () {
    const {
      editor: {
        editorBottomBarIsVisible,
        editorDropdownIsVisible,
        editorFocused,
        editorNavIsVisible,
        editorSettingsIsVisible,
        view
      },
      posts: {
        activeDraft,
        drafts,
        posts
      },
      switchEditorFocus,
      iterablePosts,
      updateActiveDraft
    } = this.props

    return (
      <EditorView
        activeDraft={ activeDraft }
        bottomBarIsShown={ editorBottomBarIsVisible }
        drafts={ drafts }
        dropdownIsShown={ editorDropdownIsVisible }
        editorFocused={ editorFocused }
        editorView={ view }
        handleChange={ this.handleChange }
        handleDelete={ this.handleDelete }
        handleEditPost={ this.handleEditPost }
        handleNewPost={ this.handleNewPost }
        handlePublish={ this.handlePublish }
        handleSaveDraft={ this.handleSaveDraft }
        handleUnpublish={ this.handleUnpublish }
        iterablePosts={ iterablePosts }
        navIsShown={ editorNavIsVisible }
        posts={ posts }
        settingIsShown={ editorSettingsIsVisible }
        switchEditorFocus={ switchEditorFocus }
        switchEditorView={ this.switchEditorView }
        toggleDropdown={ this.toggleDropdown }
        toggleEditorNav={ this.toggleEditorNav }
        toggleNav={ this.toggleGlobalNav }
        toggleSettings={ this.toggleSettings }
        updateActiveDraft={ updateActiveDraft }
      />
    )
  }
}

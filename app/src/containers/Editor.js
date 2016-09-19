import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'

import { EditorView } from '../components'
import editablePostsSelector from '../selectors/editablePostsSelector'
import * as postsActions from '../actions/posts'
import * as messageActions from '../actions/message'
import * as editorActions from '../actions/ui/editor'

class Editor extends Component {
  static propTypes = {
    createActiveDraft: PropTypes.func,
    deleteDraft: PropTypes.func,
    deletePost: PropTypes.func,
    drafts: PropTypes.object,
    editor: PropTypes.object,
    iterablePosts: PropTypes.array,
    loadDrafts: PropTypes.func,
    loadPosts: PropTypes.func,
    message: PropTypes.object,
    posts: PropTypes.object,
    publish: PropTypes.func,
    saveDraft: PropTypes.func,
    showMessage: PropTypes.func,
    switchView: PropTypes.func,
    toggleEditorDropdown: PropTypes.func,
    toggleEditorNav: PropTypes.func,
    toggleEditorSettings: PropTypes.func,
    unpublish: PropTypes.func,
    updateActiveDraft: PropTypes.func,
    updateDraft: PropTypes.func,
    updatePost: PropTypes.func
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
        activeDraft, drafts, posts
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

  toggleNav = e => {
    e.preventDefault()

    const { toggleEditorNav } = this.props

    toggleEditorNav()
  }

  toggleDropdown = e => {
    e.preventDefault()

    const { toggleEditorDropdown } = this.props

    toggleEditorDropdown()
  }

  toggleSettings = e => {
    e.preventDefault()

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
        editorDropdownIsVisible,
        editorNavIsVisible,
        editorSettingsIsVisible,
        view
      },
      posts: {
        posts,
        activeDraft,
        drafts
      },
      iterablePosts
    } = this.props

    return (
      <div>
        <Helmet title="EDITOR" />
        <EditorView
          activeDraft={ activeDraft }
          drafts={ drafts }
          dropdownIsShown={ editorDropdownIsVisible }
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
          switchEditorView={ this.switchEditorView }
          toggleDropdown={ this.toggleDropdown }
          toggleNav={ this.toggleNav }
          toggleSettings={ this.toggleSettings }
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    posts: state.posts,
    message: state.message,
    editor: state.ui.editor,
    iterablePosts: editablePostsSelector(state)
  }),
  dispatch => bindActionCreators({
    ...postsActions,
    ...messageActions,
    ...editorActions
  }, dispatch)
)(Editor)

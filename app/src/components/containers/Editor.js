import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'

import { EditorView } from '../'

import {
  posts as postsActions,
  message as messageActions,
  ui as uiActions
} from '../../actions'

class Editor extends Component {
  static propTypes = {
    createActiveDraft: PropTypes.func,
    deleteDraft: PropTypes.func,
    deletePost: PropTypes.func,
    drafts: PropTypes.object,
    editor: PropTypes.object,
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
    unpublish: PropTypes.func,
    updateDraft: PropTypes.func,
    updatePost: PropTypes.func
  }

  // POSTS CRUD

  submitPromise = (promise, data) => {
    const { showMessage } = this.props

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

    const { deletePost, deleteDraft, posts: { activeDraft, drafts, posts } } = this.props

    if (_id) {
      const toDelete =
        drafts.filter(d => d._id === _id).pop() ||
        posts.filter(d => d._id === _id).pop()

      return !toDelete.isPublished && toDelete.isSaved ?
        this.submitPromise(deleteDraft, _id) :
        this.submitPromise(deletePost, _id)
    }

    return !activeDraft.isPublished && activeDraft.isSaved ?
      this.submitPromise(deleteDraft, activeDraft._id) :
      this.submitPromise(deletePost, activeDraft._id)
  }

  // UI INTERACTIONS

  handleEditPost = (e, newActiveDraft) => {
    e.preventDefault()

    const { createActiveDraft } = this.props

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

  switchEditorView = (e, view) => {
    e.preventDefault()

    const { switchView } = this.props

    switchView(view)
  }

  render() {
    const {
      editor: {
        editorDropdownIsVisible,
        editorNavIsVisible,
        view
      },
      posts: {
        posts,
        activeDraft,
        drafts
      }
    } = this.props

    return (
      <div>
        <Helmet title="editor" />
        <EditorView
          activeDraft={ activeDraft }
          drafts={ drafts }
          dropdownIsShown={ editorDropdownIsVisible }
          handleDelete={ this.handleDelete }
          handleEditPost={ this.handleEditPost }
          handleNewPost={ this.handleNewPost }
          handlePublish={ this.handlePublish }
          handleSaveDraft={ this.handleSaveDraft }
          handleUnpublish={ this.handleUnpublish }
          navIsShown={ editorNavIsVisible }
          posts={ posts }
          toggleDropdown={ this.toggleDropdown }
          toggleNav={ this.toggleNav }
          switchEditorView={ this.switchEditorView }
          editorView={ view }
        />
      </div>
    )
  }
}

export default connect(({
  posts,
  message,
  ui: { editor }
}) => ({
  posts,
  message,
  editor
}),
  dispatch => bindActionCreators({
    ...postsActions,
    ...messageActions,
    ...uiActions.editor
  }, dispatch)
)(Editor)

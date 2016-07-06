import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'

import { AdminView } from '../'

import {
  posts as postsActions,
  message as messageActions
} from '../../actions'

class Admin extends Component {
  static propTypes = {
    createActiveDraft: PropTypes.func,
    deleteDraft: PropTypes.func,
    deletePost: PropTypes.func,
    drafts: PropTypes.object,
    loadDrafts: PropTypes.func,
    loadPosts: PropTypes.func,
    loadPostsAndDrafts: PropTypes.func,
    message: PropTypes.object,
    posts: PropTypes.object,
    publish: PropTypes.func,
    saveDraft: PropTypes.func,
    showMessage: PropTypes.func,
    unpublish: PropTypes.func,
    updateDraft: PropTypes.func,
    updatePost: PropTypes.func
  }

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

  handleEditPost = (e, newActiveDraft) => {
    e.preventDefault()

    const { createActiveDraft } = this.props

    return createActiveDraft(newActiveDraft)
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

  render() {
    const { posts: { posts, activeDraft, drafts } } = this.props

    return (
      <div>
        <Helmet title="admin" />
        <AdminView
          activeDraft={ activeDraft }
          drafts={ drafts }
          handleDelete={ this.handleDelete }
          handleEditPost={ this.handleEditPost }
          handleNewPost={ this.handleNewPost }
          handlePublish={ this.handlePublish }
          handleSaveDraft={ this.handleSaveDraft }
          handleUnpublish={ this.handleUnpublish }
          posts={ posts }
        />
      </div>
    )
  }
}

export default connect(({
  posts, message
}) => ({
  posts, message
}),
  dispatch => bindActionCreators({
    ...postsActions,
    ...messageActions
  }, dispatch)
)(Admin)

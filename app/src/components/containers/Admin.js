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
    createDraft: PropTypes.func,
    deleteDraft: PropTypes.func,
    deletePost: PropTypes.func,
    editPost: PropTypes.func,
    loadDrafts: PropTypes.func,
    loadPosts: PropTypes.func,
    loadPostsAndDrafts: PropTypes.func,
    message: PropTypes.object,
    posts: PropTypes.object,
    publish: PropTypes.func,
    showMessage: PropTypes.func,
    unpublish: PropTypes.func
  }

  submitPromise = (promise, data) => {
    const { loadPostsAndDrafts, showMessage } = this.props

    return promise(data)
      .then(({ message }) => showMessage(message))
      .catch(({ message }) => showMessage(message))
      .then(loadPostsAndDrafts)
      .catch(loadPostsAndDrafts)
  }

  handleSubmit = e => {
    e.preventDefault()

    const { editPost, publish, posts: { activeDraft } } = this.props

    return !activeDraft.isPublished ?
      this.submitPromise(publish, activeDraft) :
      this.submitPromise(editPost, activeDraft)
  }

  handleUnpublish = e => {
    e.preventDefault()

    const { unpublish, posts: { activeDraft } } = this.props

    return this.submitPromise(unpublish, activeDraft)
  }

  handleEdit = (e, newActiveDraft) => {
    e.preventDefault()

    const { createDraft } = this.props

    return createDraft(newActiveDraft)
  }

  handleDelete = (e, _id) => {
    e.preventDefault()

    const { deletePost, deleteDraft, posts: { activeDraft } } = this.props

    return !activeDraft.isPublished && activeDraft.isSaved ?
      this.submitPromise(deleteDraft, _id) :
      this.submitPromise(deletePost, _id)
  }

  render() {
    const { posts: { posts, activeDraft, drafts } } = this.props

    return (
      <div>
        <Helmet title="admin" />
        <AdminView
          drafts={ drafts }
          posts={ posts }
          activeDraft={ activeDraft }
          handleSubmit={ this.handleSubmit }
          handleUnpublish={ this.handleUnpublish }
          handleEdit={ this.handleEdit }
          handleDelete={ this.handleDelete }
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

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'

import { AdminView } from '../'

import { posts as postsActions } from '../../actions'

class Admin extends Component {
  static propTypes = {
    createDraft: PropTypes.func,
    loadDrafts: PropTypes.func,
    publish: PropTypes.func,
    unpublish: PropTypes.func,
    deleteDraft: PropTypes.func,
    deletePost: PropTypes.func,
    editPost: PropTypes.func,
    loadPosts: PropTypes.func,
    posts: PropTypes.object
  }

  submitPromise = (promise, data) => {
    const { loadDrafts, loadPosts } = this.props

    return promise(data)
      .then(loadDrafts)
      .then(loadPosts)
      .catch(loadDrafts)
      .catch(loadPosts)
      .then(() => browserHistory.push('/'))
      .catch(() => browserHistory.push('/'))
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
  posts
}) => ({
  posts
}),
  dispatch => bindActionCreators({
    ...postsActions
  }, dispatch)
)(Admin)

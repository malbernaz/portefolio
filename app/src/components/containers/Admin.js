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
    publish: PropTypes.func,
    deletePost: PropTypes.func,
    editPost: PropTypes.func,
    loadPosts: PropTypes.func,
    posts: PropTypes.object
  }

  handleSubmit = e => {
    e.preventDefault()

    const { editPost, publish, loadPosts, posts: { activeDraft } } = this.props

    const submitPromise = promise =>
      promise(activeDraft)
        .then(loadPosts)
        .catch(loadPosts)
        .then(() => browserHistory.push('/'))
        .catch(() => browserHistory.push('/'))

    if (activeDraft.slug !== null) return submitPromise(editPost)

    return submitPromise(publish)
  }

  handleEdit = (e, newActiveDraft) => {
    e.preventDefault()

    const { createDraft } = this.props

    return createDraft(newActiveDraft)
  }

  handleDelete = (e, slug) => {
    e.preventDefault()

    const { deletePost, loadPosts } = this.props

    return deletePost(slug)
      .then(loadPosts)
      .catch(loadPosts)
      .then(() => browserHistory.push('/'))
      .catch(() => browserHistory.push('/'))
  }

  render() {
    const { posts: { posts, activeDraft } } = this.props

    return (
      <div>
        <Helmet title="admin" />
        <AdminView
          posts={posts}
          activeDraft={activeDraft}
          handleSubmit={this.handleSubmit}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}

export default connect(
  ({ posts }) => ({ posts }),
  dispatch => bindActionCreators({ ...postsActions }, dispatch))(Admin)

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
    publishDraft: PropTypes.func,
    deletePost: PropTypes.func,
    editPost: PropTypes.func,
    loadPosts: PropTypes.func,
    posts: PropTypes.object
  }

  handleSubmit = e => {
    e.preventDefault()

    const { editPost, publishDraft, loadPosts, posts: { draft } } = this.props

    const submitPromise = promise =>
      promise(draft)
        .then(loadPosts)
        .catch(loadPosts)
        .then(() => browserHistory.push('/'))
        .catch(() => browserHistory.push('/'))

    if (draft.slug !== null) return submitPromise(editPost)

    return submitPromise(publishDraft)
  }

  handleEdit = (e, { raw, meta, html, slug }) => {
    e.preventDefault()

    console.log(meta)

    const { createDraft } = this.props

    return createDraft({ raw, meta, html, slug })
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
    const { posts: { posts, draft } } = this.props

    return (
      <div>
        <Helmet title="admin" />
        <AdminView
          posts={posts}
          draft={draft}
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

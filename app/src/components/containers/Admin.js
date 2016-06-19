import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'

import defaultDraft from '../../helpers/defaultDraft'

import { AdminView } from '../'

import { posts as postsActions } from '../../actions'

class Admin extends Component {
  static propTypes = {
    posts: PropTypes.object,
    publishDraft: PropTypes.func,
    loadPosts: PropTypes.func,
    createDraft: PropTypes.func,
    deletePost: PropTypes.func
  }

  handleSubmit = e => {
    e.preventDefault()

    const { publishDraft, loadPosts, posts: { draft } } = this.props

    return publishDraft(draft)
      .then(loadPosts)
      .catch(loadPosts)
      .then(() => browserHistory.push('/'))
      .catch(() => browserHistory.push('/'))
  }

  handleEdit = (e, { raw, title, subtitle, tags, slug, html }) => {
    e.preventDefault()

    const { createDraft } = this.props
    const meta = { title, subtitle, tags }

    return createDraft({ raw, meta, html, slug })
  }

  handleDelete = (e, slug) => {
    e.preventDefault()

    const { deletePost, loadPosts, createDraft } = this.props

    return deletePost(slug)
      .then(createDraft(defaultDraft))
      .catch(createDraft(defaultDraft))
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

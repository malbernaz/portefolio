import React, { Component, PropTypes } from 'react'

import { Icon } from '../'

class EditorSidebar extends Component {
  static propTypes = {
    drafts: PropTypes.array,
    handleDelete: PropTypes.func.isRequired,
    handleEditPost: PropTypes.func.isRequired,
    posts: PropTypes.array
  }

  constructor(props) {
    super(props)

    this.state = { iterablePosts: this.iterablePosts(props) }
  }

  componentWillReceiveProps = props =>
    this.setState({ iterablePosts: this.iterablePosts(props) })


  iterablePosts = ({ posts, drafts }) => drafts
    .concat(posts)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  render() {
    const { iterablePosts } = this.state
    const { handleEditPost, handleDelete } = this.props

    return (
      <div className="posts-list">
        { iterablePosts.length > 0 ?
            iterablePosts.map((p, i) =>
              <div className="post-item" key={ i }>
                { p.isPublished ?
                  <small>{ p.meta.title }</small> :
                  <small className="isDraft">{ p.meta.title }<span>draft</span></small> }
                <div className="post-actions">
                  <a onClick={ e => handleEditPost(e, p) } className="post-action edit" href="#">
                    <Icon name="edit" />
                  </a>
                  <a
                    onClick={ e => handleDelete(e, p._id) }
                    className="post-action delete"
                    href="#"
                  >
                    <Icon name="trashcan" />
                  </a>
                </div>
              </div>
            ) :
          <div className="post-item">
            no posts yet :(
          </div> }
      </div>
    )
  }
}

export default EditorSidebar

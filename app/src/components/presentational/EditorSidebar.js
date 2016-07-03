import React, { PropTypes } from 'react'

import { Icon } from '../'

const EditorSidebar = ({ posts, drafts, handleEditPost, handleDelete }) => {
  const iterablePosts = () => drafts
    .concat(posts)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .reverse()

  return (
    <div className="posts-list">
      { iterablePosts().length > 0 ?
          iterablePosts().map((p, i) =>
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

EditorSidebar.propTypes = {
  drafts: PropTypes.array,
  handleDelete: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  posts: PropTypes.array
}

export default EditorSidebar

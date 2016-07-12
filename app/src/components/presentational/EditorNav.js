import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { editablePostsSelector } from '../../selectors'
import { Icon } from '../'

const b = 'editor-panes__nav'

const EditorNav = ({ iterablePosts, handleEditPost, handleDelete }) => (
  <div className={ b }>
    { iterablePosts.length > 0 ?
        iterablePosts.map((p, i) =>
          <div className={ `${b}__item` } key={ i }>
            { p.isPublished ?
              <small className={ `${b}__item__title` }>{ p.meta.title }</small> :
              <small
                className={ `${b}__item__title--draft` }
              >
                { p.meta.title }
              </small> }
            <div className={ `${b}__item__actions` }>
              <a
                onClick={ e => handleEditPost(e, p) }
                className={ `${b}__item__actions__action` }
                href="#"
              >
                <Icon name="edit" />
              </a>
              <a
                onClick={ e => handleDelete(e, p._id) }
                className={ `${b}__item__actions__action--delete` }
                href="#"
              >
                <Icon name="trashcan" />
              </a>
            </div>
          </div>
        ) :
      <div className={ `${b}__item` }>
        <small className={ `${b}__item__title` }>
          no posts yet :(
        </small>
      </div> }
  </div>
)

EditorNav.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  iterablePosts: PropTypes.array
}

export default connect(
  (state) => ({ iterablePosts: editablePostsSelector(state) })
)(EditorNav)
import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Icon from '../Icon'
import s from './EditorNav.scss'

const EditorNav = ({ iterablePosts, handleEditPost, handleDelete, isShown, toggle }) =>
  <div className={ isShown ? s.rootIsShown : s.root }>
    { iterablePosts.length > 0 ?
      iterablePosts.map((p, i) =>
        <div className={ s.item } key={ i }>
          { p.isPublished ?
            <span className={ s.title }>
              { p.meta.title }
            </span> :
            <span className={ s.titleDraft }>
              { p.meta.title }
            </span> }
          <div className={ s.actions }>
            <a onClick={ e => handleEditPost(e, p) } className={ s.action }>
              <Icon name="edit" />
            </a>
            <a onClick={ e => handleDelete(e, p._id) } className={ s.actionDelete }>
              <Icon name="trashcan" />
            </a>
          </div>
        </div>
      ) :
      <div className={ s.item }>
        <span className={ s.title }>no posts yet :(</span>
      </div> }
    <div onClick={ toggle } className={ isShown ? s.shadowIsShown : s.shadow } />
  </div>

const { func, arrayOf, object, bool } = PropTypes

EditorNav.propTypes = {
  handleDelete: func.isRequired,
  handleEditPost: func.isRequired,
  iterablePosts: arrayOf(object),
  isShown: bool,
  toggle: func
}

export default withStyles(s)(EditorNav)

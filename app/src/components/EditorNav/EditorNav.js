import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { Icon } from '../'
import s from './EditorNav.scss'

const EditorNav = ({ iterablePosts, handleEditPost, handleDelete, isShown, toggle }) => (
  <div className={ isShown ? s.rootIsShown : s.root }>
    { iterablePosts.length > 0 ?
        iterablePosts.map((p, i) =>
          <div className={ s.item } key={ i }>
            { p.isPublished ?
              <small className={ s.title }>
                { p.meta.title }
              </small> :
              <small className={ s.titleDraft }>
                { p.meta.title }
              </small> }
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
        <small className={ s.title }>
          no posts yet :(
        </small>
      </div> }
    <div onClick={ toggle } className={ isShown ? s.shadowIsShown : s.shadow } />
  </div>
)

EditorNav.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEditPost: PropTypes.func.isRequired,
  iterablePosts: PropTypes.array,
  isShown: PropTypes.bool,
  toggle: PropTypes.func
}

export default withStyles(s)(EditorNav)

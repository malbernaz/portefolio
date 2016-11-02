import { createSelector } from 'reselect'

const postsNDraftsSelector = ({ posts: { posts, drafts } }) => posts.concat(drafts)

const sortByUpdateAt = list => list ?
  list.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) : []

export default createSelector(
  postsNDraftsSelector,
  sortByUpdateAt
)

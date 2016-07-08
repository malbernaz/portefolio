import { createSelector } from 'reselect'

const postsSelector = ({ posts: { posts } }) => posts

const sortByCreatedAt = list => list
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

export default createSelector(
  postsSelector,
  sortByCreatedAt
)

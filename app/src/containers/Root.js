/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import WithStylesContext from '../helpers/WithStylesContext'

const Root = ({ store, renderProps }) =>
  <Provider store={ store }>
    <WithStylesContext onInsertCss={ s => s._insertCss() }>
      <Router { ...renderProps } />
    </WithStylesContext>
  </Provider>

Root.propTypes = {
  renderProps: PropTypes.object,
  store: PropTypes.object
}

export default Root

/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react'
import { Router } from 'react-router/es6'
import { Provider } from 'react-redux'
import WithStylesContext from '../helpers/WithStylesContext'

const Root = ({ store, renderProps }) =>
  <Provider store={ store }>
    <WithStylesContext key={ Math.random() } onInsertCss={ s => s._insertCss() }>
      <Router { ...renderProps } key={ Math.random() } />
    </WithStylesContext>
  </Provider>

Root.propTypes = {
  renderProps: PropTypes.object,
  store: PropTypes.object
}

export default Root

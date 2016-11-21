/* eslint-disable react/forbid-prop-types */

import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import WithStylesContext from '../helpers/WithStylesContext'

const insertCss = (...styles) => {
  const removeCss = styles.map(x => x._insertCss())

  return () => removeCss.forEach(f => f())
}

export default class Root extends Component {
  static propTypes = {
    renderProps: PropTypes.object,
    store: PropTypes.object
  }

  componentDidMount () {
    const criticalCss = document.getElementById('critical-css')

    if (criticalCss) criticalCss.parentNode.removeChild(criticalCss)
  }

  render () {
    return (
      <Provider store={ this.props.store }>
        <WithStylesContext onInsertCss={ insertCss }>
          <Router { ...this.props.renderProps } />
        </WithStylesContext>
      </Provider>
    )
  }
}

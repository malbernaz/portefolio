import React from 'react'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './UserSettingsView.scss'

import { Wrapper } from '../'

const UserSettingsView = () =>
  <Wrapper>
    <Helmet title="SETTINGS" />
    <div className={ s.root }>
      <h2 className={ s.title }>settings</h2>
    </div>
  </Wrapper>

export default withStyles(s)(UserSettingsView)

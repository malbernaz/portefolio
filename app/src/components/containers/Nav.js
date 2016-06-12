import React from 'react'
import { IndexLink } from 'react-router'

const Nav = () => (
  <div>
    this is a nav
    <ul>
      <li><IndexLink to="/">home </IndexLink></li>
      <li><IndexLink to="/about">about </IndexLink></li>
      <li><IndexLink to="/contact">contact </IndexLink></li>
      <li><IndexLink to="/admin/signin">signin </IndexLink></li>
      <li><IndexLink to="/admin">admin </IndexLink></li>
    </ul>
  </div>
)

export default Nav

import React from 'react'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import config from '../../config'
import Icon from '../Icon'
import Wrapper from '../Wrapper/Wrapper'

import s from './Contact.scss'

const Contact = () =>
  <Wrapper>
    <section className={ s.root }>
      <Helmet title="CONTACT" />
      <h2 className={ s.header }>
        Contact
      </h2>
      <p className={ s.blurb }>
        Want to talk about <b>code</b>?
        Have some <b>work</b> to be done?
        Want to share some <b>ideas</b>?
      </p>
      <div className={ s.item }>
        <Icon className={ s.icon } name="paper-plane" />
        <span className={ s.text }>send me an email:</span>
        <a className={ s.link } href={ `mailto:${config.email}` }>
          { config.email }
        </a>
      </div>
      <div className={ s.item }>
        <Icon className={ s.icon } name="twitter" />
        <span className={ s.text }>hit me on twitter:</span>
        <a className={ s.link } rel="noopener noreferrer" target="_blank" href={ config.twitter }>
          { config.twitter }
        </a>
      </div>
      <div className={ s.item }>
        <Icon className={ s.icon } name="github" />
        <span className={ s.text }>see my code at github:</span>
        <a className={ s.link } rel="noopener noreferrer" target="_blank" href={ config.github }>
          { config.github }
        </a>
      </div>
    </section>
  </Wrapper>

export default withStyles(s)(Contact)

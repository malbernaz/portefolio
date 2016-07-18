import React from 'react'
import Helmet from 'react-helmet'

import { Icon } from '../'

import config from '../../config'

const Contact = () => (
  <section className="contact">
    <Helmet title="contact" />
    <h2 className="contact__header">
      Contact
    </h2>
    <p className="contact__blurb">
      Want to talk about <b>code</b>?
      Have some <b>work</b> to be done?
      Want to share some <b>ideas</b>?
    </p>
    <div className="contact__item">
      <Icon className="contact__item__icon" name="paper-plane" />
      <span className="contact__item__text">send me an email:</span>
      <a className="contact__item__link" href={ config.email }>
        { config.email }
      </a>
    </div>
    <div className="contact__item">
      <Icon className="contact__item__icon" name="twitter" />
      <span className="contact__item__text">hit me on twitter:</span>
      <a className="contact__item__link" href={ config.twitter }>
        { config.twitter }
      </a>
    </div>
    <div className="contact__item">
      <Icon className="contact__item__icon" name="github" />
      <span className="contact__item__text">see my code at github:</span>
      <a className="contact__item__link" href={ config.github }>
        { config.github }
      </a>
    </div>
  </section>
)

export default Contact

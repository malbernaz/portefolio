import React from 'react'
import Helmet from 'react-helmet'

const Contact = () => (
  <section className="contact">
    <Helmet title="contact" />
    <p>send me an email:</p>
    <a href="mailto:albernazmiguel@gmail.com">
      albernazmiguel@gmail.com
    </a>
  </section>
)

export default Contact

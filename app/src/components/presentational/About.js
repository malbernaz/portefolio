import React from 'react'
import Helmet from 'react-helmet'

import { github } from '../../config'

const About = () => (
  <section className="about">
    <Helmet title="about" />
    <h2 className="about__header">
      About
    </h2>
    <div className="about__avatar"></div>
    <p className="about__blurb">
      I'm Miguel Albernaz a full time <b>web developer</b>, based in Rio de Janeiro.
      This blog is where I post about my <b>experiments</b>, <b>ideas</b> and whatever I'm up to.
      <br />
      <br />
      If that's your thing you can take a look at the
      <b> source code</b> <a href={ github }>here</a>.
    </p>
  </section>
)

export default About

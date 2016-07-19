import React from 'react'
import Helmet from 'react-helmet'

const About = () => (
  <section className="about">
    <Helmet title="about" />
    <h2 className="about__header">
      About
    </h2>
    <div className="about__avatar">
      <img src="/img/profile.jpg" alt="avatar" className="about__avatar__img"></img>
    </div>
    <p className="about__blurb">
      I'm Miguel Albernaz a full time <b>web developer</b>, based in Rio de Janeiro.
      This blog is where I post about my <b>experiments</b>, <b>ideas</b> and whatever I'm up to.
      <br />
      <br />
      While I'm not coding I like to play the <b>guitar</b>, hangout out with my <b>friends</b>,
      spend time with my <b>wife</b> and travel, if the income is not too short.
      <br />
      <br />
      If that's your thing you can take a look at this blog's <b>source code </b>
      <a target="_blank" href="https://github.com/malbernaz/portefolio">here</a>.
      Is an always evolving project, that I updated for learning purposes, and fun.
    </p>
  </section>
)

export default About

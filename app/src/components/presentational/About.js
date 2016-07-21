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
      I'm Miguel Albernaz a full stack <b>web developer</b>, based in Rio.
      This blog is where I post about my <b>experiments</b>, <b>ideas</b> and whatever I'm up to.
      <br />
      <br />
      While I'm not coding I like to play the <b>guitar</b>, hangout out with my <b>friends</b>,
      spend time with my <b>wife</b> and travel, <i>if the income is not too short</i>.
      <br />
      <br />
      This blog is an always evolving project, that I updated for learning purposes, and fun...
      If that's your thing you can take a look at the
      <b><a target="_blank" href="https://github.com/malbernaz/portefolio"> source code here</a></b>.
    </p>
  </section>
)

export default About

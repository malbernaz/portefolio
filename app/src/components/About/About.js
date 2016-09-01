import React from 'react'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './About.scss'

const About = () => (
  <div className={ s.wrapper }>
    <section className={ s.root }>
      <Helmet title="ABOUT" />
      <h2 className={ s.header }>
        About
      </h2>
      <div className={ s.avatar }>
        <img src="/img/profile.jpg" alt="avatar" className={ s.img } />
      </div>
      <p className={ s.blurb }>
        I'm Miguel Albernaz a full stack <b>web developer</b>, based in Rio.
        This blog is where I post about my <b>experiments</b>, <b>ideas</b> and whatever I'm up to.
      </p>
      <p className={ s.blurb }>
        While I'm not coding I like to play the <b>guitar</b>, hangout out with my <b>friends</b>,
        spend time with my <b>wife</b> and travel, <i>if the income is not too short</i>.
      </p>
      <p className={ s.blurb }>
        This blog is an always evolving project, that I update for learning purposes, and fun...
        If that's your thing you can take a look at the
        <b>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/malbernaz/portefolio"
          >
            { ' source code here' }
          </a>
        </b>.
      </p>
    </section>
  </div>
)

export default withStyles(s)(About)

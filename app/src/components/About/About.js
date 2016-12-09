/* eslint-disable max-len */

import React from 'react'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Wrapper from '../Wrapper/Wrapper'

import s from './About.scss'

import profileImage from '../../static/profile.jpg'

const About = () =>
  <Wrapper>
    <section className={ s.root }>
      <Helmet title="ABOUT" />
      <h2 className={ s.header }>
        About
      </h2>
      <div className={ s.avatar }>
        <img src={ profileImage } alt="avatar" className={ s.img } />
      </div>
      <p className={ s.blurb }>
        I&apos;m Miguel Albernaz a full stack <b>web developer</b>, from Rio.
        This blog is where I post about my <b>experiments</b>, <b>ideas</b> and whatever I&apos;m up to.
      </p>
      <p className={ s.blurb }>
        While I&apos;m not coding I like to play the <b>guitar</b>, hangout out with my <b>friends</b>,
        spend time with my <b>wife</b> and travel, <i>if the income is not too short</i>.
      </p>
      <p className={ s.blurb }>
        This blog is an always evolving project, that I update for learning purposes, and fun...
        If that&apos;s your thing you can take a look at the
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
  </Wrapper>

export default withStyles(s)(About)

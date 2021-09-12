import React from 'react'
import { useStateValue } from '../../hooks/general'
import Logo from '../shared/logo'

const Footer = () => {
  const componentLoading = useStateValue('ui componentLoading')
  if (componentLoading) return null

  const FOOTER_LINKS = {
    'Languages': [
      'Ruby',
      'JavaScript',
      'HTML5 & CSS3',
      'SQL',
      'Java',
    ],

    'Frameworks & Libraries': [
      'Rails',
      'React',
      'Redux',
      'RSpec & Jest',
      'Relay',
    ],

    'Other Technologies & Tools': [
      'Git',
      'Heroku',
      'MongoDB',
      'GraphQL',
      'Webpack & Babel',
    ],
  }

  let linkLists = []

  for (let category in FOOTER_LINKS) {
    linkLists.push(
      <ul key={category} className='footer-link-list'>
        <li className='footer-link-category' key={category}><strong>{category}</strong></li>

        {FOOTER_LINKS[category].map((link, i) => (
          <li key={i} className='footer-link'>{link}</li>
        ))}
      </ul>
    )
  }

  return (
    <section className='footer'>
      <div className='footer-pane-primary'>
        <div className='footer-pane-primary_content'>
          <Logo text='About Me' />
          <div className='footer-links-container'>
            {linkLists}
          </div>
        </div>
      </div>
      <div className='footer-social-pane'>
        <span className="icon icon-std icon-grey">
          <a href="https://github.com/gorterd">
            <i className="fab fa-github"></i>
          </a>
        </span>
        <span className="icon icon-std icon-grey">
          <a href="https://www.linkedin.com/in/daniel-gorter-87549277"><i className="fab fa-linkedin"></i></a>
        </span>
        <a className="button button-blue" href="mailto: danieljgorter@gmail.com">Contact me</a>
      </div>
    </section>
  )
}

export default Footer
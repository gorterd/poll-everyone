import React from 'react'
import { useStateValue } from '../../util/custom_hooks'
import Logo from './logo'

const Footer = () => {
  const componentLoading = useStateValue('ui componentLoading')
  if (componentLoading) return null

  const FOOTER_LINKS = {
    'Languages': [
      'Ruby',
      'JavaScript',
      'Java',
      'SQL',
      'HTML',
      'CSS',
    ],
    
    'Frameworks & Libraries': [
      'Rails',
      'React',
      'Redux',
      'JQuery',
    ],
    
    'Technologies & Tools': [
      'Git',
      'Heroku',
      'Google Apps Script',
      'Bash',
      'RSpec',
    ],
    
    'Knowledge': [
      'Data Structures',
      'RESTful Design',
      'TDD',
    ],
  }

  let linkLists = []

  for (let category in FOOTER_LINKS){
    linkLists.push(
      <ul key={category} className='footer-link-list'>
        <li className='footer-link-category' key={category}><strong>{category}</strong></li>

        {FOOTER_LINKS[category].map( (link, i) => (
          <li key={i} className='footer-link'>{link}</li>
        ))}
      </ul>
    )
  }
  
  return (
    <section className='footer'>
      <div className='footer-pane'>
        <div className='footer-pane-container'>
          <Logo />
          <div className='footer-links-container'>
            {linkLists}
          </div>
        </div>  
      </div>
      <div className='footer-social-pane'>
        <div className='footer-social-container'>
          <div className='footer-social-left'>
          </div>
          <div className='footer-social-right'>
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
        </div>
      </div>
    </section>
  )
}

export default Footer
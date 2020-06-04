import React from 'react';
import Logo from './logo';

const Footer = () => {
  const FOOTER_LINKS = {
    "Services": [
      "Events",
      "Learning & redevelopment",
      "Primary education",
      "Postsecondary education",
      "International",
      "Business",
      "Cloud meetings",
    ],
    
    "Desktop apps": [
      "PowerPresentation",
      "Keynotation",
      "Goggle Slides",
      "Slacker",
    ],
    
    "Mobile apps": [
      "eOS",
      "Droid",
    ],
    
    "Support": [
      "Plans & prices",
      "Premium features",
      "Super premium features",
      "How it works",
      "Support",
      "Guides",
      "Visual guide",
      "Webinars",
    ],
    
    "Company": [
      "About us",
      "Blog",
      "Career",
      "Security",
    ]
  };

  let linkLists = [];

  for (let category in FOOTER_LINKS){
    linkLists.push(
      <ul key={category} className='footer-link-list'>
        <li className='footer-link-category' key={category}><strong>{category}</strong></li>

        {FOOTER_LINKS[category].map( (link, i) => (
          <li key={i} className='footer-link'><a>{link}</a></li>
        ))}
      </ul>
    );
  }
  
  return (
    <section className='footer'>
      <div className='footer-pane'>
        <div className='footer-pane-container'>
          <Logo relativeRootPath='/'/>
          <div className='footer-links-container'>
            {linkLists}
          </div>
        </div>  
      </div>
      <div className='footer-social-pane'>
        <div className='footer-social-container'>
          <div className='footer-social-left'>
            {['Status', 'Cookies', 'Terms', 'Privacy'].map( (link, i) => (
              <a key={i} className="footer-social-link">{link}</a>
            ))}
          </div>
          <div className='footer-social-right'>
            <span className="icon icon-std icon-grey"><i className="fab fa-linkedin"></i></span>
            <span className="icon icon-std icon-grey"><i className="fab fa-twitter"></i></span>
            <button className="button button-blue">Contact us</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;
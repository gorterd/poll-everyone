import React from 'react';
import AttributedImage from '../shared/attributed_image';
import { Link } from 'react-router-dom';

const HomeSplash = () => {
  return (
    <section className='home-splash-container'>
      <div className="home-splash-pane">
        <div className="first-pane-sub first-pane-text">
          <h1>Host engaging realtime surveys, wherever, whenever.</h1>
          <h3>Gather informative feedback instantly in your class, meeting, conference, or any other event.</h3>
          <Link className="button" to="/signup/splash">Get started</Link>
        </div>
        <div className="first-pane-sub first-pane-image">
          <AttributedImage 
            src={window.homeSplash01URL} 
            alt={"Woman Conducting a Survey"} 
            imgClass="home-splash-img"
            iconClass="icon-grey"
            >
            <a href="https://www.freepik.com/free-photos-vectors/illustration">Illustration vector created by stories - www.freepik.com</a>
          </AttributedImage>
        </div>
      </div>
    </section>
  )
}

export default HomeSplash;
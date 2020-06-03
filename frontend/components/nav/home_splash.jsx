import React from 'react';
import AttributedImage from '../shared/attributed_image';

const HomeSplash = () => {
  return (
    <section>
      <div className="home-splash-pane">
        <div className="first-pane-sub first-pane-text">
          <h1>Host engaging realtime surveys, wherever, whenever.</h1>
          <h3>Gather informative feedback instantly in your class, meeting, conference, or any other event.</h3>
          <button className="button">Get started</button>
        </div>
        <div className="first-pane-sub first-pane-image">
          <AttributedImage 
            src={window.splash01URL} 
            alt={"Woman Conducting a Survey"} 
            imgClass="splash01">
            <a href="https://www.freepik.com/free-photos-vectors/illustration">Illustration vector created by stories - www.freepik.com</a>
          </AttributedImage>
        </div>
      </div>
    </section>
  )
}

export default HomeSplash;
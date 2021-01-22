import React from 'react';
import {Link} from 'react-router-dom'
import AttributedImage from '../../shared/attributed_image';
import signupSplashImg from '../../../images/splash/signup-splash-01.png'

const SignupSplash = () => {
  return (
    <section className='signup signup-splash'>
      <div className="signup-div-left">
        <div className="signup-div-text">
          <h1>Present with Poll Everyone</h1>
          <p>Create your account and start presenting today</p>
          <Link className="button button-white" to='/signup/create'>I'm a presenter</Link>

        </div>

        <AttributedImage
          src={signupSplashImg}
          alt={"Business Presentation"}
          imgClass="signup-splash-img"
          iconClass="icon-light"
          >
          <a href="https://stories.freepik.com/illustration/on-the-office/rafiki">Illustration vector created by stories - stories.freepik.com</a>
        </AttributedImage>
        
      </div>
      <div className="signup-div-right">
        <div className="signup-div-text">
          <h1>Participate in a presentation</h1>
          <Link to='/participate' className="button button-blue">I'm a participant</Link>
        </div>
      </div>
    </section>
  )
}

export default SignupSplash;
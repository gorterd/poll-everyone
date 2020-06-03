import React from 'react';
import {Link} from 'react-router-dom'

const SignupSplash = () => {
  return (
    <section className='signup signup-splash'>
      <div className="signup-div-left">
        <div className="signup-div-text">
          <h1>Present with Poll Everyone</h1>
          <p>Create your account and start presenting today</p>
          <Link className="button button-white" to='/signup/create'>I'm a presenter</Link>

        </div>
      </div>
      <div className="signup-div-right">
        <div className="signup-div-text">
          <h1>Participate in a presentation</h1>
          <a className="button button-blue">I'm a participant</a>
        </div>
      </div>
    </section>
  )
}

export default SignupSplash;
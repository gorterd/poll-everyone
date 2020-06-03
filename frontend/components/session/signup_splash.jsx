import React from 'react';
import {Link} from 'react-router-dom'

const SignupSplash = () => {
  return (
    <section className='signup-splash'>
      <div>
        <h1>Present with Poll Everyone</h1>
        <p>Create your account and start presenting today</p>
        <Link to='/signup/create'>I'm a presenter</Link>
      </div>
      <div>
        <h1>Participate in a presentation</h1>
        <a href='#'>I'm a participant</a>
      </div>
    </section>
  )
}

export default SignupSplash;
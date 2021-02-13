import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logoAltImg from '../../images/nav/logo-alt.png'
import { useInputState } from '../../hooks/state'
import { useCurrent, useRecentPresentations } from '../../hooks/api/query'
import { classNames } from '../../util/general_util'
import { checkIfUserExists } from '../../hooks/api/mutation'

const ParticipateHome = () => {
  const history = useHistory()
  const [ error, setError ] = useState()
  const [ username, , { composeOnChange } ] = useInputState()
  const { data: { type, id } } = useCurrent()
  const { data: recents = [] } = useRecentPresentations(type, id)

  const handleChange = composeOnChange((e) => {
    const validUsernameRegex = /^[a-zA-Z0-9]*$/
    if (!validUsernameRegex.test(e.target.value)) {
      setError('Username can only include letters or numbers')
    } else if (error) {
      setError('')
    } 
  })

  const handleSubmit = e => {
    e.preventDefault()
    checkIfUserExists(username).then(
      () => history.push(`/participate/${username}`),
      () => setError('Presenter not found')
    )
  }
  
  return (
    <div className='participant-home'>
      <div className='participant-home-logo'>
        <img src={logoAltImg} alt='Logo' />
        <span> Poll Everyone</span>
      </div>
      <div className='participant-join-form-container'>
        <h2>Join presentation</h2>
        <form onSubmit={handleSubmit}>
          <div {...classNames(
            'participant-join-input-container', 
            [error, 'input-error']
          )}>
            <div className={'participant-join-input-wrapper'}>
              <span>#/participate/</span>
              <input
                autoFocus
                className='participant-join-input'
                type="text"
                onChange={handleChange}
                value={username}
                placeholder='username'
              />
            </div>
            { error && <div className="large-input-error-msg">{error}</div> }
          </div>
          <button type='submit' className='button-blue' disabled={error}>
            Join
          </button>
        </form>
      </div>
      { recents.length && (
        <h3 className='recents-header'>Recent presentations </h3>  
      )}
      <div className='recent-presentations'>
        {recents.map( ({ username, id }) => (
          <Link key={id} to={`/participate/${username}`}>
            <span>#/participate/</span>
            <span>{username}</span>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default ParticipateHome
import React from 'react'
import AttributedImage from '../../shared/attributed_image'
import participantWaitingImg from '../../../images/splash/participant-waiting.png'

const InactivePresentation = ({ username }) => (
  <div className='participant-waiting'>
    <AttributedImage
      id="participant-waiting-img"
      src={participantWaitingImg}
      alt={'preparing presentation'}
      iconClass="icon-light"
    >
      <a href="https://stories.freepik.com/illustration/work-time/amico#FF725EFF">
        Illustration vector created by stories - stories.freepik.com
      </a>
    </AttributedImage>
    <div>
      <span>Waiting for {username}'s presentation to begin...</span>
      <p>
        {username}'s presentation isn't activated right now. As soon as
        it is activated, it'll appear right here. Hang tight!
      </p>
    </div>
  </div>
)

export default InactivePresentation
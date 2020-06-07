import React from 'react';
import { batch } from 'react-redux';

class GroupsIndexToolbar extends React.Component {
  constructor(props) {
    super(props)
    
  };

  render() {
    const { selections, batchDestroy } = this.props;

    return (
      <div>
        <button className='button-grey' onClick={batchDestroy}>Delete</button>
      </div>
    ) 
  }
};

export default GroupsIndexToolbar;
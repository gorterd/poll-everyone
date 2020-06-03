import React from 'react';
import { Link } from 'react-router-dom';

class AppNavbarDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = { drop: false }
  
    this.clickHandler = this.clickHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
  };

  clickHandler(){
    this.setState({ drop: !this.state.drop});
  }
  
  blurHandler(){
    this.setState({ drop: false});
  }

  render() {
    const { currentUser, logout } = this.props;

    
    return (
      <div >
        <button className = "nav-tool" onClick={this.clickHandler}>{currentUser.username}</button>
        <ul className={"dropdown " + (this.state.drop ? "" : "hidden")} onBlur={this.blurHandler}>
          <li><Link to="/account">My settings</Link></li>
          <li><button onClick={logout}>Log out</button></li>
        </ul>
      </div>
    )
  }
};

export default AppNavbarDropdown;
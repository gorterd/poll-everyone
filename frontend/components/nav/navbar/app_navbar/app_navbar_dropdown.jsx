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
    setTimeout( () => this.setState({ drop: false}), 50);
  }

  render() {
    const { currentUser, logout } = this.props;

    
    return (
      <button className="nav-dropdown-container" onBlur={this.blurHandler}>
        <button className="nav-tool" onClick={this.clickHandler}>{currentUser.username}</button>
        <ul className={"navbar-dropdown " + (this.state.drop ? "" : "hidden")} >
          <li className="dropdown-li"><Link className="dropdown-item" to="/account">My settings</Link></li>
          <li className="dropdown-li"><button className="dropdown-item" onClick={logout}>Log out</button></li>
        </ul>
      </button>
    )
  }
};

export default AppNavbarDropdown;
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class AppNavbarDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = { drop: false }
  
    this.clickHandler = this.clickHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  clickHandler(){
    this.setState({ drop: !this.state.drop});
  }
  
  blurHandler(){
    setTimeout( () => this.setState({ drop: false}), 50);
  }

  handleLogout(){
    this.props.logout().then( () => this.props.history.push('/'))
  }

  render() {
    const { currentUser } = this.props;

    
    return (
      <button className="nav-dropdown-container" onBlur={this.blurHandler}>
        <span className="nav-tool" onClick={this.clickHandler}>{currentUser.username}</span>
        <ul className={"navbar-dropdown " + (this.state.drop ? "" : "hidden")} >
          <li className="dropdown-li"><Link className="dropdown-item" to="/account">My settings</Link></li>
          <li className="dropdown-li"><span className="dropdown-item" onClick={this.handleLogout}>Log out</span></li>
        </ul>
      </button>
    )
  }
};

export default withRouter(AppNavbarDropdown);
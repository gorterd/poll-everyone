import React from 'react';

class DropdownWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { drop: false }
    this.disableUnfocus = false;

    this.clickHandler = this.clickHandler.bind(this);
    this.clearDropdown = this.clearDropdown.bind(this);
  };

  clickHandler() {
    this.setState({ drop: !this.state.drop });
    this.disableUnfocus = true;
  }

  clearDropdown() {
    this.disableUnfocus = false;
    window.setTimeout(() => {
      if (!this.disableUnfocus) { this.setState({ drop: false }) };
      this.disableUnfocus = false;
    }, 10);
  }

  render() {
    const { button: Button, dropdown: Dropdown, buttonProps, dropdownProps, containerClass } = this.props;

    return (
      <button className={"dropdown-container " + containerClass} onBlur={this.clearDropdown}>
        <div onClick={this.clickHandler} className='dropdown-button'> <Button {...buttonProps} /> </div>
        <div 
          className={"dropdown " + (this.state.drop ? "" : "hidden")}
          onClick={this.clearDropdown}
        > <Dropdown  {...dropdownProps}/> </div>
      </button>
    )
  }
};

export default DropdownWrapper;
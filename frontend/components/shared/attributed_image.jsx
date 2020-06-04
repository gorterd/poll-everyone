import React from 'react';

class AttributedImage extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = { revealed: false }
    this.reveal = this.reveal.bind(this)
    this.hide = this.hide.bind(this)
  };

  reveal(){
    this.setState({revealed: !this.state.revealed});
  }
  
  hide(e){
    setTimeout( () => this.setState({revealed: false}), 50);
  }

  render() {
    const { children, imgClass, iconClass, ...rest } = this.props;

    return (
      <div className="attributed-image-container">
        <img className={"attributed-image " + imgClass} {...rest} />
        <div className="attribution-container">
          <button className="attribution-button" tabIndex="0"  onBlur={this.hide} onClick={this.reveal}>
            <span className={"attribution-icon " + iconClass}><i className="fas fa-at"></i></span>
          </button>
          <div  className={"attribution-popup " + (this.state.revealed ? "" : "hidden")}>
            {children}
          </div>
        </div>
      </div>
    )
  }
};

export default AttributedImage;


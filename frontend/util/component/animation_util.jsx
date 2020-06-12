import React from 'react';

class AnimatedElement extends React.Component {
  constructor(props){
    super(props)
    this.state = { rendered: this.props.renderCondition }
  }
  
  componentDidUpdate(prevProps){
    const { exiting, entering, exitAnimation } = this.props;

    if ( exiting && !prevProps.exiting ){
      if ( exitAnimation ) {
        window.setTimeout( () => {
          this.setState( {rendered: false} );
        }, parseInt(exitAnimation.animationDuration) - 20);
      } else {
        this.setState( {rendered: false} );
      };
    } else if ( entering && !prevProps.entering ) {
      this.setState({rendered: true})
    };
  }
  
  render(){
    const { component, entering, exiting, enterAnimation, exitAnimation } = this.props;
    
    let style = {};
    if (entering) { Object.assign(style, enterAnimation) }
    if (exiting) { Object.assign(style, exitAnimation) }
    
    return ( 
      <div style={style}>
        { this.state.rendered ? component : null }
      </div>
    )
  }
}

export class Animated extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      entering: false, 
      exiting: false 
    }
  }

  componentDidUpdate(prevProps){
    const {renderCondition} = this.props;
    if (renderCondition !== prevProps.renderCondition){
      this.setState({ entering: renderCondition, exiting: !renderCondition })
    }
  }
  
  render() {
    const {children, ...rest} = this.props;
    
    return <AnimatedElement component={children} {...this.state} {...rest} />
  }
}

export const AnimatedModal = ({
  modalData, closeModal, backgroundStyle, backgroundClass, modalClass, component: Component, ...rest
}) => {

  return (
    <Animated {...rest}>
      <section className={backgroundClass} onClick={closeModal} style={backgroundStyle}>
        <div className={modalClass} onClick={e => e.stopPropagation()}>
          <Component modalData={modalData} closeModal={closeModal}/>
        </div>
      </section>
    </Animated>
  )
}




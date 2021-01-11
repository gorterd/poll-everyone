import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { connect, useDispatch } from 'react-redux';
import { clearModal, clearStatus, exitModal } from '../../actions/ui_actions';
import { useAnimation } from '../custom_hooks';

export function Animatedd ({ 
  className, 
  renderCondition,
  enterAnimation,
  exitAnimation,
  children,
  cleanup
}) {
  const [ renderState, setRenderState ] = useState(
    renderCondition ? 'rendered' : 'unrendered'
  );
  const hasBeenUnrendered = useRef(!renderCondition);
    
  useEffect(() => {
    if (!renderCondition) hasBeenUnrendered.current = true;

    let timeout;
    setRenderState( oldRenderState => {
      switch (oldRenderState) {
        case 'unrendering':
          return 'unrendering';
        case 'rendered':
          if (!renderCondition && exitAnimation?.animationDuration) {
            timeout = window.setTimeout( 
              () => setRenderState('unrendered'),
              parseInt(exitAnimation.animationDuration) - 200
            )
            return 'unrendering';
          } else if (!renderCondition) { 
            return 'unrendered';
          } else {
            return 'rendered';
          }
        case 'unrendered': 
          return renderCondition ? 'rendered' : 'unrendered';
      }
    })

    return () => {
      if (timeout) {
        console.log('cleanup', timeout)
        window.clearTimeout(timeout)};
    }
  }, [renderCondition, exitAnimation]);

  let style = hasBeenUnrendered.current ? enterAnimation : {};
  if (renderState === 'unrendering')  style = exitAnimation;

  let toRender = null;
  if (renderState === 'unrendering') {
    toRender = <div style={exitAnimation}>{children}</div>;
  } else if (renderState === 'rendered') {
    toRender = hasBeenUnrendered.current 
      ? <div style={enterAnimation}>{children}</div>
      : <div>{children}</div>;
  } 

  console.log(hasBeenUnrendered)
  console.log(style, renderState);
  console.log('-------')
  return (
    <div className={className}>
      { toRender }
    </div>
  );
}

class AnimatedElement extends React.Component {
  constructor(props){
    super(props)
    this.state = { rendered: this.props.renderCondition }
  }
  
  componentDidUpdate(prevProps){
    const { exiting, entering, exitAnimation } = this.props;

    if ( exiting && !prevProps.exiting ){
      if ( exitAnimation ) {

        this.exitTimeout = window.setTimeout( () => {
          this.setState( {rendered: false} );
        }, parseInt(exitAnimation.animationDuration) - 50);
      } else {
        this.setState( {rendered: false} );
      };
    } else if ( entering && !prevProps.entering ) {
      this.setState({rendered: true})
    };
  }

  componentWillUnmount() {
    window.clearTimeout(this.exitTimeout);
  }
  
  render(){
    const { component, entering, exiting, enterAnimation, exitAnimation, className } = this.props;
    
    let style = {};
    if (entering) { Object.assign(style, enterAnimation) }
    if (exiting) { Object.assign(style, exitAnimation) }

    return ( 
      <div style={style} className={className}>
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
  component: Component, 
  modalData, modalClass, 
  backgroundStyle, backgroundClass, 
  renderCondition, 
  enterAnimation, 
  exitAnimation
}) => {

  const dispatch = useDispatch();

  const [ renderState, animationStyle, key ] = useAnimation({
    renderCondition,
    enterAnimation,
    exitAnimation,
    afterEnter:  () => dispatch(clearStatus()),
    afterExit:  () => dispatch(clearModal()),
  });

  const style = {...backgroundStyle, ...animationStyle};
  const closeModal = () => dispatch(exitModal())

  return renderState && (
    <section 
      className={backgroundClass} 
      onClick={closeModal} 
      style={style} 
      key={key}
    >
      <div className={modalClass} onClick={e => e.stopPropagation()}>
        <Component modalData={modalData} closeModal={closeModal} />
      </div>
    </section>
  );
}




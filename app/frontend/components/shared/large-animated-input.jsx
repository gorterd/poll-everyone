import React from 'react';
import { Animated } from './wrappers/animation_util';

class LargeInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = { focus: false }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  handleFocus(e) {
    this.setState({ focus: true })
  }

  handleLeave(e) {
    this.setState({ focus: false })
  }

  render() {

    const { errorMsg, type, text, value, errorConditions, klass,
      leftSide: LeftSide, leftSideProps, rightSide: RightSide, rightSideProps, ...rest } = this.props;

    const activated = Boolean(value || this.state.focus);
    const erroredOut = (typeof errorConditions === 'undefined') ? errorMsg : Boolean(errorMsg && errorConditions);

    const errorEle = erroredOut ? <div className="large-input-error-msg">{errorMsg}</div> : null

    const upAndIn = {
      animationName: "slide-up-and-in",
      animationDuration: "200ms",
      animationIterationCount: 1,
      animationTimingFunction: "ease-out",
      animationFillMode: "forwards",
    };

    const downAndOut = {
      animationName: "slide-down-and-out",
      animationDuration: "200ms",
      animationIterationCount: 1,
      animationFillMode: "forwards",
    };

    return (
      <div className={`large-input-container ${klass} ${(erroredOut ? "input-error" : "")}`}>
        <div className={"large-input-wrapper" + (activated ? " activated" : "")}>
          { LeftSide ? <LeftSide {...leftSideProps} /> : null}
          <input
            className={activated ? " activated" : ""}
            onFocus={this.handleFocus}
            onBlur={this.handleLeave}
            type={type}
            value={value}
            {...rest}
          />
          <div className="small-input-label-container">
            <Animated
              renderCondition={activated}
              enterAnimation={upAndIn}
              exitAnimation={downAndOut}
            ><div className="small-input-label">{text}</div>
            </Animated>
          </div>
          <div className="placeholder-input-label-container">
            <Animated
              renderCondition={!activated}
              enterAnimation={upAndIn}
            ><div className="placeholder-input-label">{text}</div>
            </Animated>
          </div>
          { RightSide ? <RightSide {...rightSideProps} /> : null }
        </div>
        {errorEle}
      </div>
    )
  }
}

export default LargeInput;
handleFocus(e){
  this.setState({ focus: true })
}

handleLeave(e){
  this.setState({ focus: false })
}

const activated = Boolean(value || this.state.focus);


const upAndIn = {
  animationName: "slide-up-and-in",
  animationDuration: "200ms",
  animationIterationCount: 1,
  animationTimingFunction: "ease-out",
};

const downAndOut = {
  animationName: "slide-down-and-out",
  animationDuration: "200ms",
  animationIterationCount: 1,
  animationTimingFunction: "ease-in",
};

  <input
    onFocus={this.handleFocus}
    onBlur={this.handleLeave}
    type={this.state.curType}
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
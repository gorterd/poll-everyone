# README

## Welcome!

[Poll Everyone](https://poll-everyone.herokuapp.com/), a clone of [Poll Everywhere](https://www.polleverywhere.com/), is a live polling / survey web application that allows:

* presenters to create and edit multiple choice questions, and organize them into groups
* participants to answer activated polls from their own devices via a custom link
* audiences and presenters to view results in real time

## Technologies Used

* Backend
    * Ruby on Rails
    * Action Cable (Rails' web sockets frameworks)
    * PostgreSQL
* Frontend
    * React & React-Router
    * Redux
    * Lodash Throttle for scroll events
    * Recharts for poll graphing
    * J-Query for API requests

## Challenges and Solutions

### Frontend Example 

Let's say you have some React component, that should sometimes display 
and sometimes not, depending on a render condition.

For instance, in Poll Everyone, when you click the button to create a new group, a modal fades 
into view. When leaving the modal, it smoothly fades out.

Entering:

![Imgur](https://i.imgur.com/OuirtyQ.gif)

Exiting:

![Imgur](https://i.imgur.com/TiaFYKq.gif)

Enter animations are easy enough with CSS, but exiting is tougher. I can
think of two main ways you could make a component disappear using CSS and
toggled classes:
  1. Apply a class that makes the component invisible, have zero height, 
      0 opacity, etc, i.e. it's still there but you don't see it. 
      Easy to animate: just apply a transition. But it also clutters your DOM, 
      and from my understanding can cause problems with accessibility. 
      So, not ideal.
  1. Use `display: none`. Cool, the component disappears from the DOM tree;
      it's a cleaner and more accessible solution. But how do you animate
      from `display: [something]` to `display: none`? I personally don't know
      if there's a way using just CSS. So, also a no go.

I know there are libraries out there that make React animations easy, but I 
wanted to see if I could come up with my own solution. 

Let's give the name `Fickle` to the component that is conditionally rendered,
and animates upon exit/entry.

`Fickle` shouldn't care about when it appears, how it comes in, or how it goes.
It just knows what to render when it's asked to. 

You, meanwhile, the person coding the parent component of `Fickle` should _only_ 
have to tell `Fickle` when it should appear (its `renderCondition`), how it 
should enter (`enterAnimation`), and how it should exit (`exitAnimation`).

All the logic in between I split into two wrapper React components: `Animated`
and `AnimatedElement`. 

`Animated` is given a `renderCondition`, `enterAnimation`, 
and `exitAnimation`, as well as the component to animate itself. It handles
state. It listens for changes to the `renderCondition`, and then decides
whether the component should now start entering or exiting.

```
export class Animated extends React.Component {
  constructor(props){
    super(props)
    this.state = {           //=> my design decision: when first mounted (when
      entering: false,       //   parent mounts) component shouldn't animate, 
      exiting: false         
    }                       
  }

  componentDidUpdate(prevProps){
    const { renderCondition } = this.props;
    if (renderCondition !== prevProps.renderCondition){
      this.setState({                 //=> render condition has changed! 
        entering: renderCondition,    //   update whether its entering or 
        exiting: !renderCondition     //   exiting
      });                             
    }
  }
  
  render() {
    const { children, ...rest } = this.props;
    
    return <AnimatedElement component={children} {...this.state} {...rest} />
  }
}
```

It passes this state as props to `Animated Element`. `Animated Element` checks
if the component is newly set to `entering` or `exiting`, and for `exiting`,
immediately applies the exit animation (in `render`), and sets a timeout to stop 
rendering once the animation is complete (in `componentDidUpdate`).

```
class AnimatedElement extends React.Component {
  constructor(props){
    super(props)
    this.state = { rendered: this.props.renderCondition }
  }
  
  componentDidUpdate(prevProps){
    const { exiting, entering, exitAnimation } = this.props;


    if ( exiting && !prevProps.exiting ){      //=> component should no longer
      if ( exitAnimation ) {                   //   be rendered; if an exit  
        window.setTimeout( () => {             //   animation was provided, play
          this.setState( {rendered: false} );  //   it, then stop rendering
        }, parseInt(exitAnimation.animationDuration) - 20); 
      } else {
        this.setState( {rendered: false} );
      };
    } else if ( entering && !prevProps.entering ) {        
      this.setState({rendered: true})
    };
  }
  
  render(){
    const { component, entering, exiting, 
            enterAnimation, exitAnimation } = this.props;
    
    let style = {};             //=> apply animation CSS for entering / exiting
    if (entering) { Object.assign(style, enterAnimation) }
    if (exiting) { Object.assign(style, exitAnimation) }
    
    return ( 
      <div style={style}>
        { this.state.rendered ? component : null }
      </div>
    )
  }
}
```

### Backend Example (Coming Soon)

## Next Steps

* Enhance visuals and functionality of the poll results view

* Build out poll configurations and settings

* Ensure a great user experience for all browsers, including mobile

* Guarantee reliable keyboard navigation and accessibility features

* Add reports and additional poll formats



import React from 'react';
import { connect } from 'react-redux';
import App from './app';
import { Switch, Route } from 'react-router-dom';
import ParticipantApp from './participant/participant_app';

class AppContainer extends React.Component {
  
  componentDidUpdate(prevProps){
    const { modal, scrollY } = this.props;
    if ( prevProps.modal.type && !modal.type ){
      window.scrollTo(0, scrollY);
    } 
  }

  render() {
    const { modal, scrollY, stickyToolbar } = this.props;
    let klass = null;
    let style = null;
    if (modal.type) {
      klass = ' freeze-scroll';
      // style = { top: ((scrollY * -1) + modal.offset ) };
      style = { top: ((scrollY * -1) ) };
    } else if ( stickyToolbar ) {
      style = { top: stickyToolbar, position: 'relative' };
    }

    return (
      <section className={'app' + (klass || '')} style={style}>
        <Switch>
          <Route path='/participate'>
            <ParticipantApp />
          </Route>
          <App />
        </Switch>
      </section>
    );
  }
};

const mapState = ({ 
  ui: { 
    modal,
    stickyToolbar, 
    data: { scrollY } 
  } }) => ({ modal, scrollY, stickyToolbar });

export default connect(mapState)(AppContainer);


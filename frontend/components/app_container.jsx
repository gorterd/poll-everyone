import React from 'react';
import { connect } from 'react-redux';
import App from './app';

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
      klass = 'freeze-scroll';
      style = { top: ((scrollY * -1) + modal.offset ) };
    } else if ( stickyToolbar ) {
      style = { top: stickyToolbar, position: 'relative' };
    }

    return (
      <section className={klass} style={style}>
        <App />
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


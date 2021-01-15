import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from '../store/configure_store';
import AppContainer from './app_container';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { store: null }
  }
  componentDidMount() {
    this.setState({ store: configureStore(this.props.preloadedState) });
  }

  render() {
    return this.state.store && (
      <Provider store={this.state.store}>
        <HashRouter>
          <AppContainer />
        </HashRouter>
      </Provider>
    );
  } 
}


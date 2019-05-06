import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import { Router } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content';
import history from './history';
import FlashMessagesList from './components/FlashMessagesList';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
        <Provider store={store}>
          <Router history={history}>
            <div className='App'>
              <AppNavbar />
              <Container>
                <FlashMessagesList />
                <Content />
              </Container>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
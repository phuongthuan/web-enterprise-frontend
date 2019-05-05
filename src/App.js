import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <div className='App'>
              <AppNavbar />
              <Container>
                <Content />
              </Container>
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
import React, { Component } from 'react'
import styled from 'styled-components';
import bgImage from '../assets/background.jpg';
import LoginForm from '../components/auth/LoginForm';


const LoginPageWrapper = styled.div`
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

class LoginPage extends Component {
  render() {
    return (
      <LoginPageWrapper>
        <LoginForm />
      </LoginPageWrapper>
    )
  }
}

export default LoginPage;
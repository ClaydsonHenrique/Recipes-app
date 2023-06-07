import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import submitEmail from '../redux/actions';
import './login.css';

class Login extends Component {
  state = {
    btnDisabled: true,
    email: '',
    password: '',

  };

  handleValidation = () => {
    const { email, password } = this.state;

    const MAGIC_NUMBER = 6;
    /* const minLength = password.length >= minEmail; */

    const confirm = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (confirm.test(email) || password.length > MAGIC_NUMBER) {
      this.setState({
        btnDisabled: !(confirm.test(email) && password.length > MAGIC_NUMBER),
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.handleValidation);
  };

  handleSubmition = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;

    const user = {
      email,
    };

    localStorage.setItem('user', JSON.stringify(user));

    const storedUser = localStorage.getItem('user');
    dispatch(submitEmail(storedUser));
    history.push('/meals');
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <div className="login__page">
        <form>
          <label htmlFor="email" placeholder="email">
            Email
          </label>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <label htmlFor="password" placeholder="password">
            Password
          </label>
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-btn"
            name="btnDisabled"
            disabled={ btnDisabled }
            onClick={ this.handleSubmition }
          >
            Enter
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);

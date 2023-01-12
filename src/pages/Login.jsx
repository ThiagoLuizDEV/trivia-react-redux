import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sendUserInfo from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    buttonDisabled: true,
    willRedirect: false,
  };

  verificaEmail = () => {
    const { email, name } = this.state;
    const total = 6;
    const validacaoEmail = /[^@ \n]+@[^@ \n]+\.[^@ \n]/;
    if (validacaoEmail.test(email) && name.length >= total) {
      this.setState({ buttonDisabled: false });
    } else { this.setState({ buttonDisabled: true }); }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.verificaEmail(); });
  };

  handleClick = async () => {
    const { email, name } = this.state;
    const { dispatch } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(sendUserInfo(name, email));
    localStorage.setItem('token', data.token);
    this.setState({ willRedirect: true });
  };

  settingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, buttonDisabled, willRedirect } = this.state;
    return (
      <>
        {willRedirect && <Redirect to="/game" />}
        <div>Login</div>
        {console.log(this.props)}
        <form>
          <h3>Insira seu nome:</h3>
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <h3>Insira seu Email:</h3>
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            placeholder="Digite aqui seu email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsBtn }
          >
            Configuração
          </button>
        </form>
      </>
    );
  }
}
Login.propTypes = {
  history: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);

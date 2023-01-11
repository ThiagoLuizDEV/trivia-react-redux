import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    buttonDisabled: true,
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

  settingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, buttonDisabled } = this.state;
    return (
      <>
        <div>Login</div>
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
            type="submit"
            data-testid="btn-play"
            disabled={ buttonDisabled }
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
}.isRequired;

export default Login;

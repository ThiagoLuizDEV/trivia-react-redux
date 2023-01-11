import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

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
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    this.setState({ willRedirect: true });
  };

  render() {
    const { name, email, buttonDisabled, willRedirect } = this.state;
    return (
      <>
        {willRedirect && <Redirect to="/game" />}
        <div>Login</div>
        <form>
          <h3>Insira seu nome:</h3>
          <input
            type="text"
            id="text"
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
        </form>
      </>
    );
  }
}

export default Login;

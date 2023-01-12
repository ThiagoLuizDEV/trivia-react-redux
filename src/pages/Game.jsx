import React from 'react';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    const emailUser = localStorage.getItem('user');
    const hash = md5(emailUser).toString();
    // console.log(hash);
    this.setState({
      hash,
    });
  }

  render() {
    const { hash } = this.state;

    return (
      <header>
        <h2>Informações da pessoa jogadora:</h2>

        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="user"
        />

        <h3 data-testid="header-player-name">
          Nome do jogador:

        </h3>
        <h3 data-testid="header-score">
          Placar: 0
        </h3>
      </header>
    );
  }
}

export default Game;

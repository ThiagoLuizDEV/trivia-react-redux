import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const emailUser = email;
    const hash = md5(emailUser).toString();
    this.setState({
      hash,
    });
  }

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
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
          { name }
        </h3>
        <h3 data-testid="header-score">
          { score }
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.getUserInfo.name,
  email: globalState.getUserInfo.email,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Header);

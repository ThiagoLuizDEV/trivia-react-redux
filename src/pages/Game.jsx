import React from 'react';
import Header from './Header';
import GameContent from './GameContent';

class Game extends React.Component {
  render() {
    return (
      <>
        <Header />
        <GameContent />
      </>
    );
  }
}

export default Game;

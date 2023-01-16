import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
  state = {
    feedMsg: '',
  };

  componentDidMount() {
    this.feedMsgGen();
  }

  feedMsgGen() {
    const { assertions } = this.props;
    const mN = 3;
    if (assertions < mN) {
      this.setState({ feedMsg: 'Could be better...' });
    } else {
      this.setState({ feedMsg: 'Well Done!' });
    }
  }

  render() {
    const { feedMsg } = this.state;
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">{feedMsg}</div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Feedback);

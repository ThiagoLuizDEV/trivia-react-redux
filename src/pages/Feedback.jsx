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
    return (
      <>
        <Header />
        <div data-testid="feedback-text">{feedMsg}</div>
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
});

export default connect(mapStateToProps)(Feedback);

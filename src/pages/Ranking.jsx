import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>

        <button
          onClick={ () => history.push('/') }
          type="button"
          data-testid="btn-go-home"
        >
          Home
        </button>

      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;

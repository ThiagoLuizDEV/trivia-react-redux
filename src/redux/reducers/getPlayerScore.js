const INITIAL_STATE = {
  score: 0,
  assertions: 0,

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_PLAYER_SCORE': {
    return {
      ...state,
      score: action.score,
      assertions: state.assertions + 1,
    };
  }
  default:
    return state;
  }
};

export default player;

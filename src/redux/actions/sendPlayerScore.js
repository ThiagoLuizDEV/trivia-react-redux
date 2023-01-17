const sendPlayerScore = (score) => ({
  type: 'SEND_PLAYER_SCORE',
  payload: {
    score,
  },
});

export default sendPlayerScore;

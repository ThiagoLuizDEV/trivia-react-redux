export default sendUserInfo = (name, email) => ({
  type: 'SEND_USER_INFO',
  payload: {
    name,
    email,
  },
});

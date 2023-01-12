const sendUserInfo = (name, email) => ({
  type: 'SEND_USER_INFO',
  payload: {
    name,
    email,
  },
});

export default sendUserInfo;

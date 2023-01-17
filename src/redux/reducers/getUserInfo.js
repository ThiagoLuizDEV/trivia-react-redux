const INITIAL_STATE = {
  email: '',
  name: '',

};

const getUserInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_USER_INFO': {
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  }
  default:
    return state;
  }
};

export default getUserInfo;

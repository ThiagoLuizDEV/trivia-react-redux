const INITIAL_STATE = {
  email: '',
  nome: '',
};

const getUserInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_LOGIN': {
    return {
      name: action.payload.name,
      email: action.payload.email,
    };
  }
  default: return state;
  }
};

export default getUserInfo;

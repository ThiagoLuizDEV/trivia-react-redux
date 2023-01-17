import { combineReducers } from 'redux';
import getUserInfo from './getUserInfo';
import player from './getPlayerScore';

const rootReducer = combineReducers({ getUserInfo, player });

export default rootReducer;

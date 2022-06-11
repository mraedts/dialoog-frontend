import userReducer from './userReducer';
import chatReducer from './chatReducer';
import opinionReducer from './opinionReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    user: userReducer,
    chats: chatReducer,
    opinions: opinionReducer
});

export default rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}





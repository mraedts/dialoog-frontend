import userReducer from './userReducer';
import chatReducer from './chatReducer';
import opinionReducer from './opinionReducer';
import { combineReducers } from 'redux';
import subscriptionReducer from './subscriptionReducer';

const appReducer = combineReducers({
    user: userReducer,
    chats: chatReducer,
    opinions: opinionReducer,
    subscription: subscriptionReducer
});

export default rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}





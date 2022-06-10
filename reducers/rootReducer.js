import userReducer from './userReducer';
import friendsReducer from './friendsReducer';
import chatReducer from './chatReducer';
import { combineReducers } from 'redux';


export default combineReducers({
    friends: friendsReducer,
    user: userReducer,
    chats: chatReducer
  });


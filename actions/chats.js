export const createNewChat = (chatData) => (
    {
      type: 'CREATE_NEW_CHAT',
      payload: chatData,
    }
);

export const addMessageToChat = (message, toUserId) => (
    {
      type: 'ADD_MESSAGE_TO_CHAT',
      payload: {message, toUserId},
    }
);

export const deleteChats = arg => (
  {
    type: 'DELETE_CHATS',
    payload: arg,
  }
);


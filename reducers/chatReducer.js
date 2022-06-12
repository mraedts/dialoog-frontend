const INITIAL_STATE =  [
    {
        user: { img: '../../../../assets/person1.jpg', name: 'Jolanda', userId: 1 },
        messages: [
            { time: new Date(), text: "Lorem ipsum", fromSelf: false },
            { time: new Date(), text: "Lorem asdasd", fromSelf: false },
            { time: new Date(), text: "Lorem iasdasdasdpsum", fromSelf: true },
        ],
        topic: "Rutte"
    }  
];
  
const chatReducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
          case 'CREATE_NEW_CHAT':
            
            const newChat = {
                user: {
                    img: action.payload.img,
                    name: action.payload.name,
                    userId: action.payload.userId
                },
                messages: [],
                topic: action.payload.topic
            }
      
            // update the redux state
            
        
            return [...state, newChat];
      
          case 'ADD_MESSAGE_TO_CHAT':
            const {message, userId} = action.payload.message;
            
            const newState = [...state];
            console.log(action.payload)
            let chatIndex;

            for (let i = 0; i < state.length; i++) {
                if (state[i].user.userId === userId) {
                    chatIndex = i;
                } 
            }

            newState[chatIndex].messages.push(message);

            return newState;

        case 'DELETE_CHATS':
            return [];

          default:
            return state;
          }
};

export default chatReducer;
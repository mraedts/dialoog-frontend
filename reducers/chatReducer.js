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
            
        
            return {...state, newChat};
      
          case 'ADD_MESSAGE_TO_CHAT':
            
            const newState = [...state];
            newState[0].messages.push(action.payload.message.message);

            console.log(newState);
            return newState;

          default:
            return state;
          }
};

export default chatReducer;
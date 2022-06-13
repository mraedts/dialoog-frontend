const INITIAL_STATE = {}
    
const subscriptionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_SUBSCRIPTION':
            return action.payload
        default:
          return state;
        }
};

export default subscriptionReducer;
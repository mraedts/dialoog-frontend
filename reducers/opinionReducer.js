const INITIAL_STATE = []
    

const opinionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MODIFY_OPINION':
          // Pulls current and possible out of previous state
          // We do not want to alter state directly in case
          // another action is altering it at the same time
          
            return state;
          

          

        case 'SET_OPINIONS':
          return action.payload;
          
        default:
          return state;
        }
};

export default opinionReducer;
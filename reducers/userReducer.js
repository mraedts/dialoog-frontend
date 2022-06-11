const INITIAL_STATE = {
    
  };
  
const userReducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
          case 'SET_NAME':
            // Pulls current and possible out of previous state
            // We do not want to alter state directly in case
            // another action is altering it at the same time
            const {
              authToken
            } = state;
      
            // update the redux state
            const newState = { name: action.payload, authToken };
        
            return newState;
      
          case 'SET_AUTHTOKEN':
            const {name} = state;

            console.log(state);
            return {name, authToken: action.payload};
            
          case 'SET_USER':
            return action.payload;

          default:
            return state;
          }
};

export default userReducer;
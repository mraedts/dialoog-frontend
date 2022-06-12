const INITIAL_STATE = {
    
  };
  
const userReducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
          case 'SET_NAME':
            // Pulls current and possible out of previous state
            // We do not want to alter state directly in case
            // another action is altering it at the same time
            
            // update the redux state
            const newState = { ...state, name: action.payload };
        
            return newState;
      
          case 'SET_AUTHTOKEN':
            

            console.log(state);
            return {...state, authToken: action.payload};
            
          case 'SET_USER':
            return action.payload;

          case 'SET_ACCEPTING_MATCHES':
            const stateCopy = {...state};

            stateCopy.acceptingMatches = action.payload

            return stateCopy;

          case 'USER_LOGOUT':
            return {};

          default:
            return state;
          }

          
};

export default userReducer;
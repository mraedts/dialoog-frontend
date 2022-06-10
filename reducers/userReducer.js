const INITIAL_STATE = {
    authToken: '2136dghjfj8123723Fe',
    name: 'Jolanda'
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

            return {name, authToken: action.payload};

          default:
            return state;
          }
};

export default userReducer;
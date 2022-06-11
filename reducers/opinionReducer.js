const INITIAL_STATE = []
    

const opinionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MODIFY_OPINION':
          // Pulls current and possible out of previous state
          // We do not want to alter state directly in case
          // another action is altering it at the same time
          const newState = [...state];

          let opinionIndex = -1;

          console.log(action.payload)
          state.forEach((opinion, index) => {
            if (action.payload.statementid === opinion.statementid) {
                opinionIndex = index;
            }
          });

          if (opinionIndex !== -1) {
            newState[opinionIndex].answer = action.payload.answer;
            return newState;
          }
          else {
            return state
          }

        case 'SET_OPINIONS':
          return action.payload;
          
        default:
          return state;
        }
};

export default opinionReducer;
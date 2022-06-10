import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from './Components/Main';

import rootReducer from './reducers/rootReducer';
const store = createStore(rootReducer);


export default function App() {

  return (
      <Provider store={store}>
        <Main>
        </Main>
      </Provider>
  )
}



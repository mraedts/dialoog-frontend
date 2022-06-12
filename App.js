import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from './Components/Main';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import rootReducer from './reducers/rootReducer';
import { PersistGate } from './node_modules/redux-persist/lib/integration/react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

// wrap persist API around root reducer and store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);


export default function App() {

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
      </Provider>
  )
}



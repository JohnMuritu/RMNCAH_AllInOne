import { routerMiddleware, connectRouter } from 'connected-react-router';
import {
  createStore, compose, applyMiddleware, combineReducers
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducer';

export default function configureStore(history) {
  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  const initialState = {};
  const enhancers = [];
  const windowIfDefined = typeof window === 'undefined' ? null : window;
  /* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const rootReducer = combineReducers({
    main_reducer: reducer,
    router: connectRouter(history)
  });

  const persistConfig = {
    key: 'root',
    storage: storageSession,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

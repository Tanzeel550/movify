import { applyMiddleware, combineReducers, createStore } from 'redux';
import movieReducer from '../reducers/movieReducer';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';

const configStore = createStore(
  combineReducers({ movies: movieReducer, auth: authReducer }),
  applyMiddleware(thunk)
);

configStore.subscribe(() => {
  console.log(configStore.getState());
});

export default configStore;

import { applyMiddleware, combineReducers, createStore } from 'redux';
import movieReducer from '../reducers/movieReducer';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';

const configStore = createStore(
  combineReducers({
    movies: movieReducer,
    auth: authReducer,
    error: errorReducer,
  }),
  applyMiddleware(thunk)
);

configStore.subscribe(() => {
  console.log(configStore.getState());
});

export default configStore;

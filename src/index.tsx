import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/app.scss';
import AppRouter, { browserHistory } from './router/AppRouter';
import configStore from './store/configStore';
import { firebase } from './firebase/firebase';
import { startGetAllMovies } from './actions/moviesAsyncActions';
import { startLogout } from './actions/authActions';
import { login, logout } from './reducers/authReducer';
import LoadingDots from './components/Utils/LoadingDots';
import { setError } from './reducers/errorReducer';

window.addEventListener('offline', () =>
  configStore.dispatch(
    setError({
      title: 'Network',
      message:
        'You have disconnected. Please check your Connection and then Try Again...',
    })
  )
);

ReactDOM.render(<LoadingDots />, document.getElementById('root'));

const jsx = (
  <React.StrictMode>
    <Provider store={configStore}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    configStore.dispatch(login({ user }));
    // @ts-ignore
    configStore.dispatch(startGetAllMovies()).then(() => {
      renderApp();
    });
    if (browserHistory.location.pathname !== '/') browserHistory.push('/');
  } else {
    startLogout().then(() => {
      configStore.dispatch(logout());
      renderApp();
      browserHistory.push('/login');
    });
  }
});

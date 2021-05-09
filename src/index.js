import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/app.scss';
import AppRouter from './router/AppRouter';
import configStore from './store/configStore';

const jsx = (
  <Provider store={configStore}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));

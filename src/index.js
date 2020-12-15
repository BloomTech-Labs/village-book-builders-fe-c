import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';

import 'antd/dist/antd.less';

import reducer from './state/reducers/index';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { Security, LoginCallback, SecureRoute } from '@okta/okta-react'; <-------------- OKTA --------------
import PrivateRoute from './utils/PrivateRoute';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { LandingPage } from './components/pages/Landing';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
// import { config } from "./utils/oktaConfig" <-------------- OKTA --------------
import { LoadingComponent } from './components/common';

import reducer from './state/reducers/index';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  // const authHandler = () => { <-------------- OKTA --------------
  // 	// We pass this to our <Security /> component that wraps our routes.
  // 	// It'll automatically check if userToken is available and push back to login if not :)
  // 	history.push("/login")
  // }

  return (
    // ! Commented out <Security> because it's an Okta component -- we're using Google Auth
    // <Security {...config} onAuthRequired={authHandler}>  <-------------- OKTA --------------
    <Switch>
      <Route path="/login" component={LoginPage} />

      {/* <Route path="/implicit/callback" component={LoginCallback} /> <-------------- OKTA -------------- */}
      <Route path="/landing" component={LandingPage} />
      {/* any of the routes you need secured should be registered as SecureRoutes */}
      <PrivateRoute
        path="/"
        exact
        component={() => <HomePage LoadingComponent={LoadingComponent} />}
      />
      <PrivateRoute path="/example-list" component={ExampleListPage} />
      <PrivateRoute path="/profile-list" component={ProfileListPage} />
      <PrivateRoute path="/datavis" component={ExampleDataViz} />
      <Route component={NotFoundPage} />
    </Switch>
    // </Security>
  );
}

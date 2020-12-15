import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../state/actions/auth';

// import Landing from './pages/Landing/Landing';
// import Routes from './Routes';
import '../style.css';
import HeadmasterDashboard from './pages/Headmaster/HeadmasterDashboard';
import Login from './pages/Login/Login';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={HeadmasterDashboard} />
        </Switch>
        {/* <Landing {...this.props}>
            <Routes />
          </Landing> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    isLoading: state.loading,
    error: state.error,
    message: state.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

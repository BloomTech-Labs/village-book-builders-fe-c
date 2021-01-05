import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// const PrivateRoute = ({
//   component: Component,
//   token,
//   // loading,
//   // isLoading,
//   isAuthenticated,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={props => {
//       if (token === null) {
//         return <Redirect to="/signin" />;
//       } else {
//         return <Component {...props} />;
//       }
//     }}
//   />
// );

// const mapStateToProps = state => ({
//   token: state.token,
//   // loading: state.loading,
// });

// export default connect(mapStateToProps)(PrivateRoute);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// ? Should we pass the role through here or where the route is called? Where do we want to protect routes according to role?
const mapStateToProps = state => ({
  role: state.authReducer.role,
  // loading: state.loading,
});

export default connect(mapStateToProps)(PrivateRoute);

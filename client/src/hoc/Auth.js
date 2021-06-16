import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { me } from "../actions/userActions";

function Auth(ComposedClass, reload, adminRoute = null) {
  function AuthenticationCheck(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      const token = localStorage.getItem("token");
      dispatch(me(token));
      if (user.isAuth) {
        if (reload) {
          props.history.push("/register");
        }
      } else {
        if (adminRoute && !user.isAdmin) {
          props.history.push("/");
        } else {
          if (reload === true) {
            props.history.push("/");
          }
        }
      }
    }, [dispatch, props.history, user.isAuth, user.isAdmin]);

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}

export default Auth;

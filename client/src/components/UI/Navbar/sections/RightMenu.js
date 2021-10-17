/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { signOut } from "../../../../helpers/auth";

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);
  let rm = (
    <Menu mode={props.mode}>
      <Menu.Item key="/login" style={{ borderBottom: "none" }}>
        <Link to="/login">SIGN IN</Link>
      </Menu.Item>
      <Menu.Item key="/register" style={{ borderBottom: "none" }}>
        <Link to="/register">SIGN UP</Link>
      </Menu.Item>
    </Menu>
  );
  if (user.userData && user.userData.isAuth && !user.loading) {
    rm = (
      <Menu mode={props.mode}>
        <Menu.Item key="/favorite" style={{ borderBottom: "none" }}>
          <Link to="/favorite">FAVORITE</Link>
        </Menu.Item>
        <Menu.Item key="/logout" style={{ borderBottom: "none" }}>
          <Link
            to="/"
            type="primary"
            onClick={() => {
              signOut(() => {
                window.location.reload();
              });
            }}
            style={{ fontWeight: "bold" }}
          >
            LOGOUT
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
  if (user.loading) {
    rm = null;
  }

  return <React.Fragment>{rm}</React.Fragment>;
};

export default withRouter(RightMenu);

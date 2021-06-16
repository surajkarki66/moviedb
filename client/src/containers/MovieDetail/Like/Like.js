import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "antd";
import Axios from "../../../axios-url";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";

import { LIKE_SERVER } from "../../../configs";
import classes from "./Like.module.css";

const Like = (props) => {
  const user = useSelector((state) => state.user);
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  let variable = {};

  if (props.movie) {
    variable = { movieId: props.movieId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post(`${LIKE_SERVER}/getLikes`, variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);
        // eslint-disable-next-line
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });
    // eslint-disable-next-line
  }, []);

  const onLike = () => {
    if (user.userData) {
      if (LikeAction === null) {
        const token = localStorage.getItem("token");
        Axios.post(`${LIKE_SERVER}/upLike`, variable, {
          headers: { Authorization: "Bearer " + token },
        }).then((response) => {
          if (response.data.success) {
            setLikes(Likes + 1);
            setLikeAction("liked");
          } else {
            alert("Failed to increase the like");
          }
        });
      } else {
        const token = localStorage.getItem("token");
        Axios.post(`${LIKE_SERVER}/unLike`, variable, {
          headers: { Authorization: "Bearer " + token },
        }).then((response) => {
          if (response.data.success) {
            setLikes(Likes - 1);
            setLikeAction(null);
          } else {
            alert("Failed to decrease the like");
          }
        });
      }
    } else {
      props.history.push("/login");
    }
  };
  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Button onClick={onLike} className={classes.LikeBtn}>
            {LikeAction === "liked" ? "Liked" : "Like"}
            <span style={{ paddingLeft: "8px", cursor: "pointer" }}>
              {Likes}
            </span>
          </Button>
        </Tooltip>
      </span>
    </React.Fragment>
  );
};

export default withRouter(Like);

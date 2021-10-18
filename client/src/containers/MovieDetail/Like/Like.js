import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import Axios from "../../../axios-url";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";

import { LIKE_SERVER } from "../../../configs";
import classes from "./Like.module.css";

const Like = (props) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  let variable = {};

  if (props.movieId) {
    variable = { movieId: props.movieId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    setLoading(true);
    Axios.post(`${LIKE_SERVER}/getLikes`, variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);
        // eslint-disable-next-line
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
            setLoading(false);
          }
        });
        setLoading(false);
      } else {
        setLoading(false);
        alert("Failed to get likes");
      }
    });
    // eslint-disable-next-line
  }, []);

  const onLike = () => {
    if (user.userData) {
      if (LikeAction === null) {
        const token = localStorage.getItem("token");
        setLoading(true);
        Axios.post(`${LIKE_SERVER}/upLike`, variable, {
          headers: { Authorization: "Bearer " + token },
        }).then((response) => {
          if (response.data.success) {
            setLikes(Likes + 1);
            setLikeAction("liked");
            setLoading(false);
          } else {
            setLoading(false);
            alert("Failed to increase the like");
          }
        });
      } else {
        const token = localStorage.getItem("token");
        setLoading(true);
        Axios.post(`${LIKE_SERVER}/unLike`, variable, {
          headers: { Authorization: "Bearer " + token },
        }).then((response) => {
          if (response.data.success) {
            setLikes(Likes - 1);
            setLikeAction(null);
            setLoading(false);
          } else {
            setLoading(false);
            alert("Failed to decrease the like");
          }
        });
      }
    } else {
      props.history.push("/login");
    }
  };
  let likeIcon;
  if (LikeAction === "liked") {
    likeIcon = <LikeFilled spin={loading} />;
  } else {
    likeIcon = <LikeOutlined spin={loading} />;
  }
  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title={LikeAction === "liked" ? "Unlike" : "Like"}>
          <Button onClick={onLike} className={classes.LikeBtn}>
            {likeIcon}
            <span style={{ cursor: "pointer" }}>{!loading && Likes}</span>
          </Button>
        </Tooltip>
      </span>
    </React.Fragment>
  );
};

export default withRouter(Like);

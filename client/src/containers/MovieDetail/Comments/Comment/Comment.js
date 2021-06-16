import React, { useState } from "react";
import { withRouter } from "react-router";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "../../../../axios-url";
import { useSelector } from "react-redux";
import Like from "../../Like/Like";

import classes from "./Comment.module.css";
import { COMMENT_SERVER } from "../../../../configs";
const { TextArea } = Input;
const SingleComment = (props) => {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.userData) {
      const formData = {
        writer: user.userData._id,
        postId: props.postId,
        responseTo: props.comment._id,
        content: commentValue,
      };
      Axios.post(`${COMMENT_SERVER}/save`, formData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((response) => {
        if (response.data.success) {
          setCommentValue("");
          setOpenReply(!OpenReply);
          props.refreshFunction(response.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
    } else {
      props.history.push("/login");
    }
  };

  const actions = [
    <Like
      comment
      commentId={props.comment._id}
      userId={localStorage.getItem("userId")}
    />,
    <span
      onClick={openReply}
      key="comment-basic-reply-to"
      style={{ color: "black" }}
    >
      Reply to{" "}
    </span>,
  ];

  return (
    <div>
      {props.comment.writer !== undefined ? (
        <Comment
          actions={actions}
          author={props.comment.writer.username}
          avatar={<Avatar src={props.comment.writer.image} alt="image" />}
          content={<p>{props.comment.content}</p>}
        />
      ) : null}

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            className={classes.CommentTextArea}
            onChange={handleChange}
            value={commentValue}
            placeholder="Write Some Comments"
          />
          <br />
          <Button
            className={classes.ReplyBtn}
            onClick={onSubmit}
            disabled={commentValue ? false : true}
          >
            Reply
          </Button>
        </form>
      )}
    </div>
  );
};

export default withRouter(SingleComment);

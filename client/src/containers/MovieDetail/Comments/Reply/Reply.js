import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";

const Reply = (props) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
     // eslint-disable-next-line
    props.CommentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.CommentLists, props.parentCommentId]);

  const renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <Comment
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
            <Reply
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "black" }}
          onClick={handleChange}
        >
          View {childCommentNumber} replies(s)
        </p>
      )}

      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
};

export default Reply;

import { useState } from "react";
import CommentView from "../../UI/CommentView/CommentView";
import Reply from "../Reply/Reply";
import "./Comment.css";
import React from "react";

const Comment = (props) => {
  const { comment, currentUser } = props;

  const [displayReply, setDisplayReply] = useState({
    display: false,
    commentId: null,
  });

  const voteHandler = (commentId, vote, replyTo) => {
    props.voted(commentId, vote, replyTo);
  };

  const deleteCommentHandler = (commentId) => {
    props.deleteComment(commentId);
  };

  const displayReplies = (replies) =>
    replies.map((reply) => (
      <div key={reply.id} className="reply">
        <CommentView
          comment={reply}
          isOwnComment={currentUser.username === reply.user.username}
          voted={voteHandler}
          replyTo={repliedToHandler}
          delete={deleteCommentHandler}
        />
        {displayReply?.commentId === reply.id && (
          <Reply
            reply={replyHandler}
            title={"reply"}
            content={`@${reply.user.username} `}
            image={currentUser.image.png}
          />
        )}
      </div>
    ));

  const repliedToHandler = (commentId) => {
    setDisplayReply({ display: true, commentId });
  };

  const replyHandler = (reply) => {
    props.repliedTo({ commentId: displayReply.commentId, reply });
    setDisplayReply({ display: false, commentId: null });
  };

  return (
    <React.Fragment>
      <CommentView
        comment={comment}
        isOwnComment={currentUser.username === comment.user.username}
        voted={voteHandler}
        replyTo={repliedToHandler}
        delete={deleteCommentHandler}
      />
      {comment.replies && (
        <div className="replies">{displayReplies(comment.replies)}</div>
      )}
      {displayReply?.commentId === comment.id && (
        <Reply
          reply={replyHandler}
          title={"reply"}
          image={currentUser.image.png}
          content={`@${comment.user.username} `}
        />
      )}
    </React.Fragment>
  );
};

export default Comment;

import Comment from "../Comment/Comment";
import "./CommentList.css";

const CommentList = (props) => {
  const voted = (commentId, vote) => {
    const voted = vote === "+" ? 1 : -1;
    props.voted(commentId, voted);
  };

  return props.comments.map((comment) => (
    <div key={comment.id}>
      <Comment
        voted={voted}
        comment={comment}
        currentUser={props.user}
        repliedTo={props.replyHandler}
        deleteComment={(commentId) => {
          props.deleteComment(commentId);
        }}
      />
    </div>
  ));
};

export default CommentList;

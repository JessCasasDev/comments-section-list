import { useState } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import DeleteModal from "../DeleteModal/DeleteModal";
import Profile from "../Profile/Profile";
import VoteButton from "../VoteButton/VoteButton";
import "./CommentView.css";

const CommentView = (props) => {
  const { comment, isOwnComment, replyTo } = props;
  const [displayDelete, setDisplayDelete] = useState(false);

  const replyHandler = () => {
    replyTo(comment.id);
  };

  const deleteHandler = () => {
    setDisplayDelete(true);
  };

  const isOwnCommentButtons = isOwnComment ? (
    <div className="button__container">
      <ButtonIcon onClick={deleteHandler} icon="delete" text="Delete" />
    </div>
  ) : (
    <div className="button__container">
      {" "}
      <ButtonIcon onClick={replyHandler} icon="reply" text="Reply" />
    </div>
  );

  const minusVoteHandler = () => {
    props.voted(comment.id, "-");
  };

  const plusVoteHandler = () => {
    props.voted(comment.id, "+");
  };

  const confirmHandler = () => {
    props.delete(comment.id);
    setDisplayDelete(false);
  };

  const cancelHandler = () => {
    setDisplayDelete(false);
  };

  return (
    <section>
      {isOwnCommentButtons}
      <VoteButton
        score={comment.score}
        onPlusVote={plusVoteHandler}
        onMinusVote={minusVoteHandler}
      />
      <div>
        <Profile
          user={comment.user}
          isOwnComment={isOwnComment}
          date={comment.createdAt}
        />
        <div className="content">
          {comment.replyingTo && <span>@{comment.replyingTo} </span>}
          {comment.content}
        </div>
      </div>
      {displayDelete && (
        <DeleteModal onConfirm={confirmHandler} onCancel={cancelHandler} />
      )}
    </section>
  );
};

export default CommentView;

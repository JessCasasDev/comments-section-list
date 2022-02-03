import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import "./Reply.css";

const Reply = (props) => {
  const image = require(`../../assets${props.image}`);
  const [comment, setComment] = useState(props.content);
  const [canReply, setCanReply] = useState(false);

  useEffect(() => {
    if (comment?.length) {
      setCanReply(true);
    } else {
      setCanReply(false);
    }
  }, [comment]);

  const replyHandler = () => {
    const updatedComment = props.content
      ? comment.replace(props.content, "")
      : comment;
    props.reply(updatedComment.trim());
    setComment("");
  };

  const textChangeHandler = (event) => {
    const { target } = event;
    setComment(target.value);
  };

  return (
    <div className="own_reply">
      <img className="reply__image" src={image} />
      <textarea
        value={comment}
        onChange={textChangeHandler}
        className="textarea__comment"
      />
      <Button className="reply__button" disabled={!canReply} title={props.title} onClick={replyHandler} />
    </div>
  );
};

export default Reply;

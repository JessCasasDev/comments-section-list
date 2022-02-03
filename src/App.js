import "./App.css";
import CommentList from "./Comments/CommentList/CommentList";
import data from "./assets/data/data.json";
import Reply from "./Comments/Reply/Reply";
import { useEffect, useState } from "react";

function App() {
  let [comments, setComments] = useState([]);

  useEffect(() => {
    const comments = [...data.comments];
    setComments(comments);
  }, []);

  const injectItemInList = (list, item, itemIndex) => [
    ...list.slice(0, itemIndex),
    item,
    ...list.slice(itemIndex + 1, list.length),
  ];

  const calculateVote = (list, commentIndex, vote) => {
    const comment = { ...list[commentIndex] };

    comment.score += vote;

    return injectItemInList(list, comment, commentIndex);
  };

  const replies = comments.map((comment) => comment.replies).flat();

  const getCommentIndex = (commentId) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );
    const replyIndex = replies.findIndex((comment) => comment.id === commentId);

    return { commentIndex, replyIndex };
  };

  const voteHandler = (commentId, vote) => {
    const { commentIndex, replyIndex } = getCommentIndex(commentId);

    let newCommentsListVoted = [];
    if (commentIndex > -1) {
      newCommentsListVoted = calculateVote(comments, commentIndex, vote);
      const sortedComments = [...newCommentsListVoted].sort(
        (itemA, itemB) => itemB.score - itemA.score
      );

      setComments(sortedComments);
    }

    if (replyIndex > -1) {
      const replyList = calculateVote(replies, replyIndex, vote);

      const commentZero = { ...replies[0] };
      const commentReply = comments.findIndex(
        (comment) => comment.user.username === commentZero.replyingTo
      );
      if (commentReply > -1) {
        const repliesUpdated = {
          ...comments[commentReply],
          replies: [...replyList],
        };
        const commentsReplied = injectItemInList(
          comments,
          repliesUpdated,
          commentReply
        );
        setComments(commentsReplied);
      }
    }
  };

  const createComment = (commentText, replyingTo) => {
    let comment = {
      id: Math.floor(Math.random() * 1000),
      content: commentText,
      createdAt: "Now",
      score: 0,
      user: { ...data.currentUser },
    };
    if (replyingTo) {
      comment["replyingTo"] = replyingTo;
    } else {
      comment["replies"] = [];
    }
    return comment;
  };

  const addNewComment = (comment) => {
    debugger
    const newComment = createComment(comment);

    setComments([...comments, newComment]);
  };

  const replyHandler = ({ commentId, reply }) => {
    const { commentIndex, replyIndex } = getCommentIndex(commentId);
    const replyingTo =
      commentIndex > -1
        ? comments[commentIndex].user.username
        : replies[replyIndex].user.username;
    const newReply = createComment(reply, replyingTo);

    if (commentIndex > -1) {
      const commentToUpdate = { ...comments[commentIndex] };
      const newReplyList = injectItemInList(
        commentToUpdate.replies,
        newReply,
        commentToUpdate.replies.length
      );
      commentToUpdate.replies = [...newReplyList];
      setComments(injectItemInList(comments, commentToUpdate, commentIndex));
    }

    if (replyIndex > -1) {
      const commentToUpdate = { ...replies[replyIndex] };

      const commentReplyIndex = comments.findIndex(
        (comment) => comment.user.username === commentToUpdate.replyingTo
      );

      if (commentReplyIndex > -1) {
        const newReplyList = injectItemInList(
          comments[commentReplyIndex].replies,
          newReply,
          comments[commentReplyIndex].replies.length
        );
        const repliesUpdated = {
          ...comments[commentReplyIndex],
          replies: [...newReplyList],
        };
        const commentsReplied = injectItemInList(
          comments,
          repliesUpdated,
          commentReplyIndex
        );
        setComments(commentsReplied);
      }
    }
  };

  const deleteCommentHandler = (commentId) => {
    const { commentIndex, replyIndex } = getCommentIndex(commentId);

    if (commentIndex > -1) {
      const commentsWithoutDeleted = [
        ...comments.slice(0, commentIndex),
        ...comments.slice(commentIndex + 1, comments.length),
      ];
      setComments(commentsWithoutDeleted);
    }

    if (replyIndex > -1) {
      const getCommentOfReplyIndex = comments.findIndex(
        (comment) => comment.user.username === replies[0].replyingTo
      );
      const repliesOfCommentToDelete = [
        ...comments[getCommentOfReplyIndex].replies,
      ];
      const newReplies = [
        ...repliesOfCommentToDelete.slice(0, replyIndex),
        ...repliesOfCommentToDelete.slice(
          replyIndex + 1,
          repliesOfCommentToDelete.length
        ),
      ];
      if (getCommentOfReplyIndex > -1) {
        const newComment = {
          ...comments[getCommentOfReplyIndex],
          replies: [...newReplies],
        };

        const commentsWithReplyDeleted = injectItemInList(
          comments,
          newComment,
          getCommentOfReplyIndex
        );
        setComments(commentsWithReplyDeleted);
      }
    }
  };

  return (
    <div className="container">
      <div className="container__container">
        <CommentList
          voted={voteHandler}
          comments={comments}
          user={data.currentUser}
          replyHandler={replyHandler}
          deleteComment={deleteCommentHandler}
        />
        <Reply
          reply={addNewComment}
          title={"Send"}
          image={data.currentUser.image.png}
        />
      </div>
    </div>
  );
}

export default App;

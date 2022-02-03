import Button from "../Button/Button";
import React from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.css";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Delete = (props) => {
  return (
    <div className="modal">
      <h2>Delete Comment</h2>

      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and cannot be undone.
      </p>
      <div className="buttons">
        <Button onClick={props.onCancel} title="No, cancel" />
        <Button onClick={props.onConfirm} title="yes, delete" />
      </div>
    </div>
  );
};

const DeleteModal = (props) => (
  <React.Fragment>
    {ReactDOM.createPortal(
      <Backdrop />,
      document.getElementById("backdrop-modal")
    )}
    {ReactDOM.createPortal(
      <Delete onCancel={props.onCancel} onConfirm={props.onConfirm} />,
      document.getElementById("overlay-modal")
    )}
  </React.Fragment>
);

export default DeleteModal;

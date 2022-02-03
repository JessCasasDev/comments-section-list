import Icon from "../Icon/Icon";
import "./VoteButton.css";

const VoteButton = (props) => {
  let { score } = props;
  score = +score >= 99 ? "+99" : score;
 

  return (
    <div className="vote">
      <button className="vote__button" onClick={props.onPlusVote}>
        <Icon icon="plus" />
      </button>
      <span className="vote__score">{score}</span>
      <button className="vote__button" onClick={props.onMinusVote}>
        <Icon icon="minus" />
      </button>
    </div>
  );
};

export default VoteButton;

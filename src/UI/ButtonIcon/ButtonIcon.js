import Icon from "../Icon/Icon";
import "./ButtonIcon.css";

const ButtonIcon = (props) => {
  return (
    <button onClick={props.onClick} className="button__icon">
      <div className="button__icon-img">
        <Icon icon={props.icon} />
      </div>
      <span className="button__icon-text">{props.text}</span>
    </button>
  );
};

export default ButtonIcon;

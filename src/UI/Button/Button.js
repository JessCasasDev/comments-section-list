import "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`custom_button ${props.className}`}
    >
      {props.title}
    </button>
  );
};

export default Button;

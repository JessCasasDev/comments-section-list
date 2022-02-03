import { ReactComponent as EditIcon } from "./../../assets/images/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "./../../assets/images/icon-delete.svg";
import { ReactComponent as MinusIcon } from "./../../assets/images/icon-minus.svg";
import { ReactComponent as PlusIcon } from "./../../assets/images/icon-plus.svg";
import { ReactComponent as ReplyIcon } from "./../../assets/images/icon-reply.svg";

const Icon = (props) => {
  switch (props.icon) {
    case "edit":
      return <EditIcon />;
    case "delete":
      return <DeleteIcon />;
    case "minus":
      return <MinusIcon />;
    case "plus":
      return <PlusIcon />;
    case "reply":
      return <ReplyIcon />;
    default:
      return null;
  }
};

export default Icon;
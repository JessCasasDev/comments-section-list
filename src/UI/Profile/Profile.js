import "./Profile.css";

const Profile = (props) => {
  const { user, date, isOwnComment } = props;
  const image = require(`../../assets${user.image.png}`);
  return (
    <div className="profile-container">
      <img src={image} />
      <div className="username">{user.username}</div>
      {isOwnComment && <span className="ownName">you</span>}
      <div className="date">{date}</div>
    </div>
  );
};

export default Profile;

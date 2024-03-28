'use client'
import useUserInfo from "../../hooks/useUserInfo";

const Profile = () => {
  const userInfo = useUserInfo();
  return (
    <div>
      <div>username: {userInfo?.userName}</div>
      <div>permission: {userInfo?.permission}</div>
    </div>
  );
};

export default Profile;

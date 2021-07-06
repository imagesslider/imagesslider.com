import React, { FC } from "react";
import "../../UI/UserInfo/UserInfo.css";

type UserInfoProps = {
  user_image?: any;
  first_name?: string;
  last_name?: string;
  user_pro?: boolean;
};

const UserInfo: FC<UserInfoProps> = ({
  user_image,
  first_name,
  last_name,
  user_pro,
}) => {
  return (
    <div className="userInfo">
      {user_image?.length === 0 ? (
        <i className="fas fa-user-circle fa-8x" id="fa-user-circle"></i>
      ) : (
        <img
          crossOrigin="anonymous"
          src={user_image}
          alt={user_image}
          className="userInfo_img"
        />
      )}
      <div className="userInfo_name_wrapper">
        <h1 className="userInfo_name">{first_name}</h1>
        <h1 className="userInfo_name">{last_name}</h1>
      </div>
      {user_pro && <h4 className="userInfo_pro">PRO</h4>}
    </div>
  );
};

export default UserInfo;

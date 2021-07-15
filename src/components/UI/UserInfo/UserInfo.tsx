import React, { FC } from "react";
import "../../UI/UserInfo/UserInfo.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppType } from "../../../Type/Type";

type UserInfoProps = {
  user_image?: any;
  first_name?: string;
  last_name?: string;
  user_pro?: boolean;
  user_id?: string;
};

const UserInfo: FC<UserInfoProps> = ({
  user_image,
  first_name,
  last_name,
  user_pro,
  user_id,
}) => {
  //state redux
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  return (
    <div className="userInfo">
      {user_image?.length === 0 ? (
        <i className="fas fa-user-circle fa-8x" id="fa-user-circle"></i>
      ) : (
        <img src={user_image} alt={user_image} className="userInfo_img" />
      )}
      <div className="userInfo_name_wrapper">
        <h1 className="userInfo_name">{first_name}</h1>
        <h1 className="userInfo_name">{last_name}</h1>
      </div>
      {user_pro && <h4 className="userInfo_pro">PRO</h4>}
      {user_id === userIsLogged?.user_id && (
        <Link
          to={`/users/${user_id}/edit-profile`}
          className="userInfo_button_edit_profile"
        >
          Edit Profile
        </Link>
      )}
    </div>
  );
};

export default UserInfo;

import React, { FC } from "react";
import "../User/User.css";

export type UserType = {
  image?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

const User: FC<UserType> = ({ image, firstName, lastName, email }) => {
  return (
    <div className="user_wrapper">
      <div
        className="user_avatar"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <img crossOrigin="anonymous" src={image} alt={image} />
      </div>
      <p className="user_fullName">
        {(!!firstName || !!lastName) && `${firstName} ${lastName}`}
      </p>
      <p className="user_email">{email}</p>
    </div>
  );
};

export default User;

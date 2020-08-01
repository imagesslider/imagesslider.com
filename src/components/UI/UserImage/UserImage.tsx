import React, { FC } from "react";
import "../UserImage/UserImage.css";

export type UserImageType = {
  image?: string;
  src?: string;
  alt?: string;
  title?: string;
};

const UserImage: FC<UserImageType> = ({ image, src, alt, title }) => {
  return (
    <div
      className="userImage"
      style={{ backgroundImage: `url(${image})` }}
      title={title}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default UserImage;

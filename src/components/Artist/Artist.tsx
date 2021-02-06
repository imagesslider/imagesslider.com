import React, { FC } from "react";
import "../Artist/Artist.css";

const Artist: FC = () => {
  return (
    <div className="artist_wrapper">
      <p className="artist_description">
        Are you an artist, photographer, or videographer?
      </p>
      <p className="artist_email">Contact us: contact@imagesslider.com</p>
    </div>
  );
};

export default Artist;

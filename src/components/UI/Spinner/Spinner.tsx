import React, { FC } from "react";
import "../Spinner/Spinner.css";

const Spinner: FC = () => {
  return (
    <div className="containerLoader">
      <div className="loader" />
    </div>
  );
};

export default Spinner;

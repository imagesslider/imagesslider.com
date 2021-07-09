import React, { FC } from "react";

type ProgressBarType = {
  percentage?: number | null;
};

const ProgressBar: FC<ProgressBarType> = ({ percentage }) => {
  return (
    <div
      style={{
        width: `${percentage}%`,
        height: "10px",
        background: "#000",
        alignSelf: "flex-start",
      }}
    ></div>
  );
};

export default ProgressBar;

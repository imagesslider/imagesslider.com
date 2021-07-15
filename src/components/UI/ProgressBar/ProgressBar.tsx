import React, { FC } from "react";

type ProgressBarType = {
  percentage?: number | null;
  bgColor?: string;
};

const ProgressBar: FC<ProgressBarType> = ({ percentage, bgColor }) => {
  return (
    <div
      style={{
        width: `${percentage}%`,
        height: "10px",
        background: `${bgColor}`,
        alignSelf: "flex-start",
      }}
    ></div>
  );
};

export default ProgressBar;

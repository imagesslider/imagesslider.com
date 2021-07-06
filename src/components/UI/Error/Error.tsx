import React, { FC } from "react";

type ErrorProps = {
  title: string;
};

const Error: FC<ErrorProps> = ({ title }) => {
  return <p style={{ color: "red", textAlign: "left" }}>{title}</p>;
};

export default Error;

Error.defaultProps = {
  title: "Please fill out this field",
};

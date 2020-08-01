import React from "react";

type TabType = {
  children?: React.ReactNode;
  label?: React.ReactNode;
};

const Tab: React.FC<TabType> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tab;

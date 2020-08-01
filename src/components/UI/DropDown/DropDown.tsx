import React, { useState } from "react";
import "../DropDown/DropDown.css";

type DropDownProps = {
  onClickDropDown?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onBlurDropDown?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  buttonTitle: React.ReactNode;
};

const DropDown: React.FC<DropDownProps> = ({ buttonTitle, children }) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  //onClickDropDown
  const onClickDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  //onBlurDropDown
  const onBlurDropDown = () => {
    if (showDropDown) {
      setTimeout(() => {
        setShowDropDown(false);
      }, 200);
    }
  };

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-btn"
        onClick={onClickDropDown}
        onBlur={onBlurDropDown}
      >
        {buttonTitle}
      </button>
      <div className="dropdown-list" hidden={!showDropDown}>
        {children}
      </div>
    </div>
  );
};

export default DropDown;

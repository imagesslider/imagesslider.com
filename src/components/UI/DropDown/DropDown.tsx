import React from "react";
import "../DropDown/DropDown.css";
import { useSelector, useDispatch } from "react-redux";
import { AppType } from "../../../Type/Type";
import { showDropDownAction } from "../../../Actions/actionsApp";

type DropDownProps = {
  onClickDropDown?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onBlurDropDown?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  buttonTitle: React.ReactNode;
};

const DropDown: React.FC<DropDownProps> = ({ buttonTitle, children }) => {
  //state redux
  const selectShowDropDown = (state: AppType) => state.appState.showDropDown;
  const showDropDown = useSelector(selectShowDropDown);

  //actions redux
  const dispatch = useDispatch();

  //onClickDropDown
  const onClickDropDown = () => {
    dispatch(showDropDownAction(!showDropDown));
  };

  //onBlurDropDown
  const onBlurDropDown = () => {
    if (showDropDown) {
      setTimeout(() => {
        dispatch(showDropDownAction(false));
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

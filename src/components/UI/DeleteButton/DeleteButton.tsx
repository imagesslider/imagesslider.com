import React, { FC } from "react";
import "../../UI/DeleteButton/DeleteButton.css";

type DeleteButtonType = {
  title?: string | undefined;
  onMouseUp?: any;
  onMouseDown?: any;
};

const DeleteButton: FC<DeleteButtonType> = ({
  title,
  onMouseUp,
  onMouseDown,
}) => {
  return (
    <button
      title={title}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      className="delete_button"
    >
      <i className="fas fa-trash delete_button_fa-trash"></i>
    </button>
  );
};

export default DeleteButton;

import React, { FC } from "react";
import ReactDom from "react-dom";
import "../../UI/Modal/Modal.css";

type ModalType = {
  children?: any;
  onMouseDownBackDrop?: any;
  onMouseUpBackDrop?: any;
};

const Modal: FC<ModalType> = ({
  children,
  onMouseDownBackDrop,
  onMouseUpBackDrop,
}) => {
  //onMouseDownModal
  const onMouseDownModal = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpEdit
  const onMouseUpModal = (event: any) => {
    event.stopPropagation();
  };

  return ReactDom.createPortal(
    <>
      <div
        className="back_drop"
        onMouseDown={onMouseDownBackDrop}
        onMouseUp={onMouseUpBackDrop}
      />
      <div
        className="modal_styles"
        onMouseDown={onMouseDownModal}
        onMouseUp={onMouseUpModal}
      >
        {children}
      </div>
    </>,
    document.getElementById("portal") as any
  );
};

export default Modal;

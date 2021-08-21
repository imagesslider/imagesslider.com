import React, { FC, useState } from "react";
import "../ForgotPassword/ForgotPassword.css";
import Modal from "../../UI/Modal/Modal";
import Error from "../../UI/Error/Error";
import { auth } from "../../../Firebase/Firebase";

const ForgotPassword: FC = () => {
  //state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [emailForgot, setEmailForgot] = useState<any>("");
  const [errorForgot, setErrorForgot] = useState<string>("");
  const [succesForgot, setSuccesForgot] = useState<string>("");

  //onMouseDownAdd
  const onMouseDownAdd = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpAdd
  const onMouseUpAdd = (event: any) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  //onMouseDownBackDrop
  const onMouseDownBackDrop = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpBackDrop
  const onMouseUpBackDrop = (event: any) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  //onClickClose
  const onClickClose = () => {
    setIsOpen(false);
  };

  //Forgot Password
  const handleSubmitForgotPassword = async () => {
    if (emailForgot.length === 0) {
      setSuccesForgot("");
      setErrorForgot("The email address is badly formatted.");
      return;
    }
    try {
      setErrorForgot("");
      await auth.sendPasswordResetEmail(emailForgot);
      await setSuccesForgot("Password recent email sent successfully");
      await setEmailForgot("");
    } catch (error) {
      setSuccesForgot("");
      setErrorForgot(error);
    }
  };

  return (
    <div>
      <button
        onMouseUp={onMouseUpAdd}
        onMouseDown={onMouseDownAdd}
        className="modal_button_forgotPassword"
      >
        Forgot Password?
      </button>
      {isOpen && (
        <Modal
          onMouseUpBackDrop={onMouseUpBackDrop}
          onMouseDownBackDrop={onMouseDownBackDrop}
        >
          <div className="modal_header_forgotPassword">
            <h2>Reset Your Password</h2>
          </div>
          <div className="modal_content_forgotPassword">
            {errorForgot && <Error title={errorForgot} />}
            {succesForgot && <h4 style={{ color: "green" }}>{succesForgot}</h4>}
            <input
              placeholder="Email"
              value={emailForgot}
              onChange={(event) => setEmailForgot(event.target.value)}
              required
            />
            <button onClick={() => handleSubmitForgotPassword()}>
              Send Password Reset Email
            </button>
          </div>
          <div className="modal_footer_forgotPassword">
            <button
              className="modal_button_close_forgotPassword"
              onClick={onClickClose}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ForgotPassword;

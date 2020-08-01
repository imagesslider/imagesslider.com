import React, { FC } from "react";
import "./NoContent.css";
import { Link } from "react-router-dom";
import {
  redirectAction,
  setNoContentAction,
} from "../../../Actions/actionsApp";
import { useDispatch } from "react-redux";

export type NoContentType = {
  title?: string;
  onClickEmpty?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  showLinkBack?: boolean;
};

const NoContent: FC<NoContentType> = ({ title, showLinkBack }) => {
  //actions redux
  const dispatch = useDispatch();

  //onClickNoContent
  const onClickNoContent = () => {
    dispatch(redirectAction(false));
    dispatch(setNoContentAction(""));
  };

  return (
    <div
      className="noContent_wrapper"
      style={{ marginTop: showLinkBack ? "78px" : "20px" }}
    >
      {showLinkBack && (
        <Link to="/" className="noContent_link" onClick={onClickNoContent}>
          <i className="fas fa-arrow-left noContent fa-2x" title="Back"></i>
        </Link>
      )}
      <p className="noContent_title">{title}</p>
    </div>
  );
};

export default NoContent;

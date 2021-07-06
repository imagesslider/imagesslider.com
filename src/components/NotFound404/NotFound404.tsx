import React, { FC } from "react";
import "../NotFound404/NotFound404.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const NotFound404: FC = () => {
  return (
    <>
      <Header />
      <div className="notFound404_container">
        <h1>404 error</h1>
        <h1>page not found</h1>
        <Link to="/" className="notFound404_link">
          Go to the homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound404;

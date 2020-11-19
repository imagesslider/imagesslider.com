import React, { FC } from "react";
import "../Footer/Footer.css";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <div className="footer_wrapper">
      <Link to="/privacy-policy" className="footer_privacy-policy">
        Privacy Policy
      </Link>
      <p className="footer_email">Email: contact@imagesslider.com</p>
      <p className="footer_copyright">
        Copyright © 2020 imagesslider.com .All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

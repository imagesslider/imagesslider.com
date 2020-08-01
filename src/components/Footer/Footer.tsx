import React, { FC } from "react";
import "../Footer/Footer.css";

const Footer: FC = () => {
  return (
    <div className="footer_wrapper">
      <p className="footer_email">Email: contact@imagesslider.com</p>
      <p className="footer_copyright">
        Copyright © 2020 imagesslider.com .All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

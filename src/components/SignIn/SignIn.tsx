import React, { FC, useState } from "react";
import "./SignIn.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import Error from "../UI/Error/Error";
import ForgotPassword from "../Modals/ForgotPassword/ForgotPassword";

const SignIn: FC = () => {
  //state
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [error, setError] = useState<string>("");

  //react-router
  const history = useHistory();

  //formsubmit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      await auth.signInWithEmailAndPassword(email, password);
      await history.push(`/`);
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <div className="sign_in">
      <div className="sign_in_container">
        {error && <Error title={error} />}
        <h2 className="sign_in_title">Sign In</h2>
        <form onSubmit={handleSubmit} className="sign_in_form">
          <input
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className="buttonSubmit">
            Submit
          </button>
        </form>
        <ForgotPassword />
        <p className="sign_in_description">
          Click “Sign In” to agree to ImagesSlider acknowledge that ImagesSlider{" "}
          <Link to="/privacy-policy" className="footer_privacy-policy">
            Privacy Policy
          </Link>{" "}
          applies to you.
        </p>
      </div>
    </div>
  );
};

export default SignIn;

import React, { FC, useState } from "react";
import "../SignUp/SignUp.css";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../../Firebase/Firebase";
import Error from "../UI/Error/Error";
import SignOut from "../SignOut/SignOut";

const SignUp: FC = () => {
  //state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [passwordConfirm, setPasswordConfirm] = useState<any>("");
  const [error, setError] = useState<string>("");
  const [firstNameBlured, setFirstNameBlured] = useState<boolean>(false);
  const [lastNameBlured, setLastNameBlured] = useState<boolean>(false);
  const [emailBlured, setEmailBlured] = useState<boolean>(false);
  const [passwordBlured, setPasswordBlured] = useState<boolean>(false);
  const [passwordConfirmBlured, setPasswordConfirmBlured] =
    useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  //react-router
  const history = useHistory();

  //valid
  const isFirstNameValid = () => {
    return firstName && firstName.length > 0;
  };
  const isLastNameValid = () => {
    return lastName && lastName.length > 0;
  };
  const isEmailValid = () => {
    return email && email.length > 0;
  };
  const isPasswordValid = () => {
    return password && password.length > 0;
  };
  const isPasswordConfirmValid = () => {
    return passwordConfirm && passwordConfirm.length > 0;
  };

  //formsubmit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (passwordConfirm !== password) {
      return setError("Passwords do not match");
    }

    if (
      isFirstNameValid() &&
      isLastNameValid() &&
      isEmailValid() &&
      isPasswordValid() &&
      isPasswordConfirmValid()
    ) {
      try {
        setError("");
        await auth.createUserWithEmailAndPassword(email, password);
        await firestore.collection("users").doc(auth.currentUser?.uid).set({
          first_name: firstName,
          last_name: lastName,
          email: email,
          created_at: new Date(),
          user_id: auth.currentUser?.uid,
          user_image: "",
          user_pro: false,
        });
        setFirstNameBlured(false);
        setLastNameBlured(false);
        setEmailBlured(false);
        setPasswordConfirmBlured(false);
        setPasswordBlured(false);
        history.push("/");
      } catch (error) {
        setError(error?.message);
      }
    }
  };

  return (
    <div className="sign_up">
      <div className="sign_up_container">
        {error && <Error title={error} />}
        <h2 className="sign_up_title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="sign_up_form">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            onBlur={() => setFirstNameBlured(true)}
          />
          {(formSubmitted || firstNameBlured) && !isFirstNameValid() && (
            <Error title="Please fill First Name" />
          )}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            onBlur={() => setLastNameBlured(true)}
          />
          {(formSubmitted || lastNameBlured) && !isLastNameValid() && (
            <Error title="Please fill Last Name" />
          )}
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setEmailBlured(true)}
          />
          {(formSubmitted || emailBlured) && !isEmailValid() && (
            <Error title="Please fill Email" />
          )}
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setPasswordBlured(true)}
          />
          {(formSubmitted || passwordBlured) && !isPasswordValid() && (
            <Error title="Please fill Password" />
          )}
          <input
            placeholder="Password Confirmation"
            type="password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            onBlur={() => setPasswordConfirmBlured(true)}
          />
          {(formSubmitted || passwordConfirmBlured) &&
            !isPasswordConfirmValid() && (
              <Error title="Please fill Password Confirm" />
            )}
          <button type="submit" className="sign_up_buttonSubmit">
            Submit
          </button>
        </form>
        <p className="sign_up_description">
          Click “Sign Up” to agree to ImagesSlider acknowledge that ImagesSlider{" "}
          <Link to="/privacy-policy" className="footer_privacy-policy">
            Privacy Policy
          </Link>{" "}
          applies to you.
        </p>
      </div>
    </div>
  );
};

export default SignUp;

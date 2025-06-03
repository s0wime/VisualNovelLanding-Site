import "./header.css";
import instagramLogo from "../../assets/socialMedia/instagramLogo.svg";
import linkedinLogo from "../../assets/socialMedia/linkedinLogo.svg";
import facebookLogo from "../../assets/socialMedia/facebookLogo.svg";
import { useState } from "react";
import localManipulation from "../../utils/localManipulation.js";

function Header({ visitorId, isPressedFullVersionBtn }) {
  const [visitorEmail, setVisitorEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(
    localManipulation.get("IS_EMAIL_ADDED", true),
  );

  async function addEmail(e) {
    e.preventDefault();
    try {
      setIsErr(false);
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/visitors/submitEmail",
        {
          method: "POST",
          body: JSON.stringify({ visitorId, email: visitorEmail }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      setIsAlreadySubmitted("true");
      localStorage.setItem("IS_EMAIL_ADDED", "true");
      setVisitorEmail("");
    } catch (error) {
      setIsErr(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header">
      <div className="logos-wrapper">
        <img className="headerLogo" src={instagramLogo} alt="Instagram Logo" />
        <img className="headerLogo" src={linkedinLogo} alt="LinkedIn Logo" />
        <img className="headerLogo" src={facebookLogo} alt="Facebook Logo" />
      </div>
      {!isAlreadySubmitted && isPressedFullVersionBtn ? (
        <form onSubmit={addEmail}>
          <input
            className="header-form-input"
            placeholder="Enter your email"
            type="email"
            value={visitorEmail}
            onChange={(e) => setVisitorEmail(e.target.value)}
            required={true}
          />
          <button className="header-form-btn" type="submit">
            Submit
          </button>
        </form>
      ) : isAlreadySubmitted && isPressedFullVersionBtn ? (
        <h1 className="already-submitted">
          You are already attached your email
        </h1>
      ) : null}

      {isErr && <div>Something went wrong... Please try again</div>}
    </div>
  );
}

export default Header;

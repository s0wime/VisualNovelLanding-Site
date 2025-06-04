import "./email.css";
import localManipulation from "../../utils/localManipulation.js";
import { useState } from "react";

function Email({ visitorId }) {
  const [visitorEmail, setVisitorEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(
    localManipulation.get("IS_EMAIL_ADDED", true)
  );

  async function addEmail(e) {
    e.preventDefault();
    try {
      setIsErr(false);
      setIsLoading(true);
      const response = await fetch(
        "https://visualnovellanding-production.up.railway.app/api/visitors/submitEmail",
        {
          method: "POST",
          body: JSON.stringify({ visitorId, email: visitorEmail }),
          headers: {
            "Content-Type": "application/json",
          },
        }
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

  return !isAlreadySubmitted ? (
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
  ) : (
    <div className="finalSectionTeam">You are already attached your Email</div>
  );
}

export default Email;

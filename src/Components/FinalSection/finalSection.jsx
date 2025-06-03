import "./finalSection.css";
import logo from "../../assets/logo.svg";
import localManipulation from "../../utils/localManipulation.js";

function FinalSection() {
  return (
    <>
      <div className="coming-soon-banner">
        <h1 className="cs-title">
          YOUR STORY STARTS HERE — BUT <br />
          IT’S NOT QUITE READY TO BE TOLD{" "}
          <span role="img" aria-label="globe">
            🪐
          </span>
        </h1>
        <h2 className="cs-subtitle">
          WE’RE FINISHING THE FINAL TOUCHES ON <br />
          STORIES OF PARALLEL HEARTS, AND YOU’RE
          <br />
          ALREADY PART OF IT
        </h2>
      </div>
      <div className="finalSectionGrid">
        <div className="mainIconBox">
          <img src={logo} alt="App Logo" className="finalSectionImg" />
        </div>
        <div className="finalSectionTextBox">
          <div className="finalSectionText">
            <span role="img" aria-label="heart" className="emoji">
              💖
            </span>
            THANK YOU FOR STEPPING INTO <br /> OUR UNIVERSE.
          </div>
          <div className="finalSectionText">
            STAY TUNED — EXCITING UPDATES ARE <br /> COMING SOON!
          </div>
          <div className="finalSectionTeam">— PARALLEL HEARTS TEAM</div>
        </div>
      </div>
      <button
        className="one-more-time"
        onClick={() => {
          localManipulation.destroy([
            "isPressedFullVersionBtn",
            "IS_QUIZ_FINISHED",
            "FINAL_TITLE",
            "FINAL_MESSAGE",
            "FINAL_GENRE",
          ]);
          window.location.reload();
        }}
      >
        One more Time?
      </button>
    </>
  );
}

export default FinalSection;

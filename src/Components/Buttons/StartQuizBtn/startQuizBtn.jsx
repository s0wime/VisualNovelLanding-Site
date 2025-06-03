import LocalManipulation from "../../../utils/localManipulation.js";
import "./startQuizBtn.css";

function StartQuizBtn({ setIsStartedQuiz }) {
  return (
    <div className="quiz-start-block">
      <div className="quiz-start-text">
        <p>👉Take the quiz to discover which world your heart belongs to.</p>
      </div>
      <button
        className="quiz-start-btn"
        onClick={() => {
          setIsStartedQuiz(true);
          LocalManipulation.store([["IS_QUIZ_STARTED", true]]);
        }}
      >
        TRY NOW
      </button>
    </div>
  );
}

export default StartQuizBtn;

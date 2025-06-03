import Answer from "../Answer/answer.jsx";
import "./mainQuestion.css";
import backBtn from "../../assets/go-to-previous.svg";

function MainQuestion({
  questionText,
  answersArr,
  handleNextOrPrevious,
  questionId,
  isFirstQuestion,
}) {
  return (
    <div className="main-question">
      <h2 className="question-text">{questionText}</h2>
      <div className="answers-wrapper">
        {!isFirstQuestion && (
          <img
            src={backBtn}
            className="left-extra-btn"
            onClick={() => handleNextOrPrevious({ isBack: true })}
          />
        )}

        {answersArr.map((answer) => {
          return (
            <Answer
              key={answer.id}
              {...answer}
              handleNext={handleNextOrPrevious}
              questionId={questionId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MainQuestion;

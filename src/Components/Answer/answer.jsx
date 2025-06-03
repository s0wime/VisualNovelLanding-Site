import "./anwer.css";

function Answer({ id, text, handleNext, questionId, option }) {
  return (
    <button
      className="quiz-answer"
      onClick={() => handleNext({ questionId, answerId: id })}
    >
      {option}) {text}
    </button>
  );
}

export default Answer;

import LocalManipulation from "../../utils/localManipulation.js";
import PreparationQuestion from "../PreparationQustion/preparationQuestion.jsx";
import { useEffect, useState } from "react";
import MainQuestion from "../MainQuestion/mainQuestion.jsx";
import Loader from "../Loader/loader.jsx";
import mainQuestionsBg from "../../assets/main-questions-bg.png";
import bg from "../../assets/bg.svg";
import prepBg from "../../assets/bg-upside-down.png";

function Question({
  visitorId,
  setIsQuizFinished,
  setIsStartedQuiz,
  setFinalText,
  setFinalTitle,
  setFinalGenre,
  isPhone,
}) {
  const [questionObj, setQuestionObj] = useState({});
  const [answersArr, setAnswersArr] = useState([]);

  const [aboutAge, setAboutAge] = useState(false);
  const [aboutGender, setAboutGender] = useState(false);
  const [aboutGenre, setAboutGenre] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isFirstQuestion, setIsFirstQuestion] = useState(false);

  async function handleNextOrPrevious({
    isAboutAge = false,
    ageParam = "",
    isAboutGender = false,
    genderParam = "",
    isAboutGenre = false,
    genreParam = "",
    questionId = undefined,
    answerId = undefined,
    isBack = false,
  } = {}) {
    let body = { visitorId, answerObject: {} };

    if (!isBack) {
      setAboutAge(false);
      setAboutGender(false);
      setAboutGenre(false);

      if (isAboutAge) {
        body.answerObject.aboutAge = true;
        body.answerObject.age = ageParam;
      }
      if (isAboutGender) {
        body.answerObject.aboutGender = true;
        body.answerObject.gender = genderParam;
      }
      if (isAboutGenre) {
        body.answerObject.aboutQuizGenre = true;
        body.answerObject.quizGenre = genreParam;
      }

      body.answerObject.questionId = questionId;
      body.answerObject.answerId = answerId;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/quizzes/${isBack ? "questionBack" : "answer"}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();

      const { quizEnded, text, question, answers, title, genre } = result;
      if (!quizEnded) {
        setQuestionObj(question);
        setAnswersArr(answers);

        if (question.aboutAge) setAboutAge(true);
        if (question.aboutGender) setAboutGender(true);
        if (question.aboutQuizGenre) setAboutGenre(true);

        if (question.order === 0 && !isFirstQuestion) setIsFirstQuestion(true);
        else setIsFirstQuestion(false);
      } else {
        LocalManipulation.store([
          ["IS_QUIZ_FINISHED", true],
          ["FINAL_MESSAGE", text],
          ["FINAL_TITLE", title],
          ["FINAL_GENRE", genre],
        ]);
        LocalManipulation.destroy(["IS_QUIZ_STARTED"]);
        setIsQuizFinished(true);
        setIsStartedQuiz(false);
        setFinalText(text);
        setFinalTitle(title);
        setFinalGenre(genre);

        setQuestionObj({});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      LocalManipulation.triggerReloadInOtherTabs();
    }
  }

  useEffect(() => {
    async function startQuiz() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/quizzes/start",
          {
            method: "POST",
            body: JSON.stringify({ visitorId }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const result = await response.json();
        const { question, answers } = result;
        const { aboutAge, aboutGender, aboutQuizGenre, order } = question;
        setIsStartedQuiz(true);
        setQuestionObj(question);
        if (aboutAge) {
          setAboutAge(true);
          return;
        }
        if (aboutGender) {
          setAboutGender(true);
          return;
        }
        if (aboutQuizGenre) {
          setAboutGenre(true);
          return;
        }
        setIsFirstQuestion(order === 0);
        setAnswersArr(answers);

        LocalManipulation.store([["IS_QUIZ_STARTED", true]]);
      } catch (error) {
        console.error(error);
      }
    }

    startQuiz();
  }, []);

  useEffect(() => {
    let image;
    if (aboutAge || aboutGender || aboutGenre) image = prepBg;
    else if (questionObj.id) image = mainQuestionsBg;
    else image = bg;

    document.body.style.backgroundImage = `url(${image})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
    };
  }, [aboutAge, aboutGender, aboutGenre, questionObj.id]);

  if (aboutAge || aboutGender || aboutGenre) {
    return (
      <PreparationQuestion
        aboutAge={aboutAge}
        aboutGender={aboutGender}
        aboutGenre={aboutGenre}
        questionObj={questionObj}
        handleNextOrPrevious={handleNextOrPrevious}
        isPhone={isPhone}
      />
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Loader />
      </div>
    );
  }

  const { id: questionId, text: questionText } = questionObj;
  return (
    <MainQuestion
      questionId={questionId}
      questionText={questionText}
      answersArr={answersArr}
      handleNextOrPrevious={handleNextOrPrevious}
      isFirstQuestion={isFirstQuestion}
    />
  );
}

export default Question;

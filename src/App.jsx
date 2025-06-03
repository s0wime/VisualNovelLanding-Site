import Header from "./Components/Header/header.jsx";
import Footer from "./Components/Footer/footer.jsx";
import { useVisitorSession } from "./Hooks/useVisitorSession.js";
import { useEffect, useState } from "react";
import StartQuizBtn from "./Components/Buttons/StartQuizBtn/startQuizBtn.jsx";
import Question from "./Components/Question/question.jsx";
import LocalManipulation from "./utils/localManipulation.js";
import StartPageMainPart from "./Components/StartPageMainPart/startPageMainPart.jsx";
import "./App.css";
import ResultsPageMainPart from "./Components/ResultsPageMainPart/resultsPageMainPart.jsx";
import localManipulation from "./utils/localManipulation.js";
import FinalSection from "./Components/FinalSection/finalSection.jsx";

function App() {
  const visitorId = useVisitorSession();
  const [isStartedQuiz, setIsStartedQuiz] = useState(
    LocalManipulation.get("IS_QUIZ_STARTED") || false,
  );
  const [isQuizFinished, setIsQuizFinished] = useState(
    LocalManipulation.get("IS_QUIZ_FINISHED", true),
  );
  const [finalText, setFinalText] = useState(
    LocalManipulation.get("FINAL_MESSAGE") || "",
  );

  const [finalTitle, setFinalTitle] = useState(
    LocalManipulation.get("FINAL_TITLE") || "",
  );

  const [finalGenre, setFinalGenre] = useState(
    LocalManipulation.get("FINAL_GENRE") || "",
  );

  const [isPhone, setIsPhone] = useState(window.innerWidth < 850);
  const [isPressedFullVersionBtn, setIsPressedFullVersionBtn] = useState(
    localManipulation.get("isPressedFullVersionBtn", true),
  );

  useEffect(() => {
    function calcWidth() {
      setIsPhone(window.innerWidth < 850);
    }

    window.addEventListener("resize", calcWidth);

    return () => {
      window.removeEventListener("resize", calcWidth);
    };
  }, []);

  return (
    <div className="app-wrapper">
      {isStartedQuiz ? (
        <Question
          visitorId={visitorId}
          setIsQuizFinished={setIsQuizFinished}
          setIsStartedQuiz={setIsStartedQuiz}
          setFinalText={setFinalText}
          setFinalTitle={setFinalTitle}
          setFinalGenre={setFinalGenre}
          isPhone={isPhone}
        />
      ) : (
        <>
          <Header
            visitorId={visitorId}
            isPressedFullVersionBtn={isPressedFullVersionBtn}
          />
          {isQuizFinished ? (
            <>
              {!isPressedFullVersionBtn ? (
                <div className="finalSectionWrapper">
                  <ResultsPageMainPart
                    visitorId={visitorId}
                    finalText={finalText}
                    finalTitle={finalTitle}
                    finalGenre={finalGenre}
                    isPhone={isPhone}
                    setIsPressedFullVersionBtn={setIsPressedFullVersionBtn}
                  />
                </div>
              ) : (
                <FinalSection />
              )}
            </>
          ) : (
            <>
              <main className="main-page">
                <div className="mainContent">
                  <StartPageMainPart isPhone={isPhone} />
                </div>
                <StartQuizBtn setIsStartedQuiz={setIsStartedQuiz} />
              </main>
            </>
          )}
          {!isPressedFullVersionBtn && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;

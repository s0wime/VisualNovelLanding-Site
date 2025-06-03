import "./resultsPageMainPart.css";
import resultImg2 from "../../assets/result2Img.jpg";
import UnlockFullEpisode from "../Buttons/UnlockFullEpisode/unclockFullEpisode.jsx";
import TryForFree from "../Buttons/TryForFree/tryForFree.jsx";
import { useEffect } from "react";
import bg from "../../assets/bg.svg";

function ResultsPageMainPart({
  visitorId,
  finalText,
  finalTitle,
  finalGenre,
  isPhone,
  setIsPressedFullVersionBtn,
}) {
  useEffect(() => {
    // document.body.style.backgroundImage = `url(${bg})`;
    // document.body.style.backgroundSize = "cover";
    // document.body.style.backgroundRepeat = "no-repeat";
    // document.body.style.backgroundPosition = "center";
    // window.location.reload();
  }, []);

  return (
    <div className="finalPageMainPart">
      {!isPhone && (
        <div className="mainIconBox">
          <img className="logoResultPage" src={resultImg2} alt="Result logo" />
        </div>
      )}
      <div className="finalTextWrapper">
        <h2 className="perfectMatch">
          {"Perfect match is found".toUpperCase()} 💖
        </h2>
        <h3 className="petal">💌 {finalTitle.toUpperCase()}</h3>

        <div className="finalText">
          <h2>{finalText}</h2>
        </div>

        {isPhone && (
          <img className="logoResultPage" src={resultImg2} alt="Result logo" />
        )}
        <UnlockFullEpisode
          visitorId={visitorId}
          setIsPressedFullVersionBtn={setIsPressedFullVersionBtn}
        />
        <TryForFree
          visitorId={visitorId}
          setIsPressedFullVersionBtn={setIsPressedFullVersionBtn}
        />
      </div>
    </div>
  );
}

export default ResultsPageMainPart;

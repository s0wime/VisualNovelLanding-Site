import "./preparationQuestion.css";

function PreparationQuestion({
  aboutAge,
  aboutGenre,
  aboutGender,
  questionObj,
  handleNextOrPrevious,
  isPhone,
}) {
  function ageSetter(ageStr) {
    handleNextOrPrevious({ isAboutAge: true, ageParam: ageStr });
  }

  function genderSetter(genderStr) {
    handleNextOrPrevious({ isAboutGender: true, genderParam: genderStr });
  }

  function genreSetter(genreStr) {
    handleNextOrPrevious({ isAboutGenre: true, genreParam: genreStr });
  }

  return (
    <div className="preparation-question-container">
      <div className="preparation-question-text">
        <p>{questionObj.text}</p>
      </div>
      {aboutAge && (
        <div className="genre-gender-buttons">
          <button
            className="genre-gender-btn border-pink"
            onClick={() => ageSetter("17-21")}
          >
            17–21 — Just beginning, still writing the prologue
          </button>
          <button
            className="genre-gender-btn border-cyan"
            onClick={() => ageSetter("21-35")}
          >
            21–35 — In the heart of the plot
          </button>
          <button
            className="genre-gender-btn border-orange"
            onClick={() => ageSetter("35-45")}
          >
            35–45 — Between pages of growth and rediscovery
          </button>
          <button
            className="genre-gender-btn border-yellow"
            onClick={() => ageSetter("45+")}
          >
            45+ — A story with depth, wisdom, and second chances
          </button>
        </div>
      )}
      {aboutGender && (
        <div className="genre-gender-buttons">
          <button
            className="genre-gender-btn border-pink"
            onClick={() => genderSetter("Male")}
          >
            Male
          </button>
          <button
            className="genre-gender-btn border-cyan"
            onClick={() => genderSetter("Female")}
          >
            Female
          </button>
          <button
            className="genre-gender-btn border-orange"
            onClick={() => genderSetter("Non-binary")}
          >
            Non-binary
          </button>
          <button
            className="genre-gender-btn border-yellow"
            onClick={() => genderSetter("Prefer not to say")}
          >
            Prefer not to say
          </button>
        </div>
      )}
      {aboutGenre && (
        <div className="genre-wrapper">
          {!isPhone && (
            <div className="genre-picking-text">
              <p className="genre-lead">
                Love can bloom in neon-lit <br /> futures, enchanted forests, or{" "}
                <br />
                quiet city streets.
              </p>
              <p className="genre-action">
                Choose a setting — and we’ll <br /> show you the story waiting
                for <br />
                your heart.
              </p>
            </div>
          )}

          <div className="genre-gender-buttons">
            <button
              className="genre-gender-btn border-pink"
              onClick={() => genreSetter("FUTURISTIC")}
            >
              FUTURISTIC{" "}
            </button>
            <button
              className="genre-gender-btn border-cyan"
              onClick={() => genreSetter("MODERN")}
            >
              MODERN{" "}
            </button>
            <button
              className="genre-gender-btn border-orange"
              onClick={() => genreSetter("FANTASY")}
            >
              FANTASY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreparationQuestion;

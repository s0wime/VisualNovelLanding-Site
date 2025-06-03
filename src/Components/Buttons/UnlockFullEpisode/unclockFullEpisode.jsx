import detectEventType from "../../../utils/detectEventType.js";
import "./unlockFullEpisode.css";
import localManipulation from "../../../utils/localManipulation.js";

function UnlockFullEpisode({ visitorId, setIsPressedFullVersionBtn }) {
  return (
    <button
      className="unlockFullEpisode"
      onClick={() => {
        detectEventType(visitorId, "CLICK_TRY_PAID");
        localManipulation.store([["isPressedFullVersionBtn", true]]);
        setIsPressedFullVersionBtn(true);
      }}
    >
      <p>Unlock Full Episode for $4.99 & receive 30 💎 in bonuses</p>
    </button>
  );
}

export default UnlockFullEpisode;

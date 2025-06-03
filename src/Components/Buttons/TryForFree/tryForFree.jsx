import detectEventType from "../../../utils/detectEventType.js";
import "./tryForFree.css";
import localManipulation from "../../../utils/localManipulation.js";

function TryForFree({ visitorId, setIsPressedFullVersionBtn }) {
  return (
    <button
      className="tryForFreeBtn"
      onClick={() => {
        detectEventType(visitorId, "CLICK_TRY_FREE");
        localManipulation.store([["isPressedFullVersionBtn", true]]);
        setIsPressedFullVersionBtn(true);
      }}
    >
      TRY NOW FOR FREE
    </button>
  );
}

export default TryForFree;

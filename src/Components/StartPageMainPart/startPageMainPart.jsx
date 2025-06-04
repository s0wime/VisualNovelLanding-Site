import "./startPageMainPart.css";
import logo from "../../assets/logo.svg";

export default function StartPageMainPart({ isPhone }) {
  return (
    <div className="startPageMainPart">
      <div className="mainIconBox">
        <img className="logoMainPage" src={logo} alt="App logo" />
      </div>

      <div className="mainTextBox">
        <h1 className="mainTitle">
          STORIES OF PARALLEL
          <br /> HEARTS
        </h1>

        <div className="mainDescription">
          <p>
            What if you lived three lives at once — and love felt different in
            each one?
          </p>
          <p>
            {isPhone && "💫"}In one world, sparks fly over coffee.{" "}
            {isPhone && "🔥"}In another — secrets burn behind enemy lines.{" "}
            {isPhone && "🌌"}Somewhere far away, even machines start to feel{" "}
            <span role="img" aria-label="heart">
              🩶
            </span>
          </p>
          <p>
            One soul. Three parallel lives. A thousand ways to feel, choose...
            and love
          </p>
        </div>
      </div>
    </div>
  );
}

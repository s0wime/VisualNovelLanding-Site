import "./header.css";
import instagramLogo from "../../assets/socialMedia/instagramLogo.svg";
import linkedinLogo from "../../assets/socialMedia/linkedInLogo.svg";
import facebookLogo from "../../assets/socialMedia/facebookLogo.svg";

function Header() {
  return (
    <div className="header">
      <div className="logos-wrapper">
        <img className="headerLogo" src={instagramLogo} alt="Instagram Logo" />
        <img className="headerLogo" src={linkedinLogo} alt="LinkedIn Logo" />
        <img className="headerLogo" src={facebookLogo} alt="Facebook Logo" />
      </div>
    </div>
  );
}

export default Header;

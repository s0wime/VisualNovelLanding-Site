import copyrightIcon from "../../assets/Copyright.svg";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <img className="copy_right" src={copyrightIcon} alt="CopyRight Icon" />
    </div>
  );
}
export default Footer;

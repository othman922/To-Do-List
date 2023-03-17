import "./Footer.css";
import { useTranslation } from "react-i18next";




const Footer = () => {
  const {  i18n } = useTranslation();




  if (i18n.language === "ar") {
    return (
      <div className="myfooter">
        <footer dir="rtl" className="othman">
          تم  التصميم والبرمجة بواسطة عثمان عبدالله
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "en") {
    return (
      <div className="myfooter">
        <footer className="othman  ">
          Designed and developed by Othman Abdullah
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "de") {
    return (
      <div className="myfooter">
        <footer className="othman  ">
          Entworfen und entwickelt von Othman Abdullah
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }
};

export default Footer;

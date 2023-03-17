import "./Header.css";
import "../theme.css";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";




const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);
  
  
  
  
  
  return (
    <div className="myheader">
      <header className="hide-when-mobile othman ">
        <h1>
          <Link to="/"> Othman </Link>
        </h1>



          {/* sun / Mond */}
          {/* ستايل الشمس والقمر*/}
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>





        <ul className="flex">
          <li className="main-list lang">
          {t("lang")}

            <ul className="lang-box">
              <li
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
                dir="rtl"
              >
                <p> العربية</p>
                {i18n.language === "ar" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>

              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <p>English</p>

                {i18n.language === "en" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("de");
                }}
              >
                <p>Deutsch</p>

                {i18n.language === "de" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
            </ul>
          </li>




          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("signin")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                {t("signup")}
              </NavLink>
            </li>
          )}



          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Sign-out successful.");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >


              <button className="main-link signout">
                {  t("signout")  }
              </button>




            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                {t("support")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
              {t("account")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;

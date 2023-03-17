import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Snackbar = ({ showMessage }) => {
  const { i18n } = useTranslation();



  return (
    <div>
      <Helmet>
        <style type="text/css">{`
            
            .home .show-message {
              background-color: whitesmoke;
              font-size: 18px;
              color: #1b1b1b;
              padding: 8px 12px;
              font-weight: normal;
              border-radius: 5px;
              position: fixed;
              top: 100px;
              transition: 1s;
            }
            .Light .home .show-message {
              background-color: rgba(43, 30, 6, 0.849);
              color: wheat;
            }
            .home .fa-circle-check {
              color: rgb(30, 200, 200);
              margin-left: 5px;
            }
            
            `}</style>
      </Helmet>

      <p
        style={{
          right: showMessage ? "20px" : "-100vw",
        }}
        className="show-message"
      >
        {i18n.language === "en" && "Task added successfully"}
        {i18n.language === "de" && "Task added successfully"}
        {i18n.language === "ar" && "تمت الاضافة بنجاح"}

        
        <i className="fa-regular fa-circle-check"></i>
      </p>
    </div>
  );
};

export default Snackbar;

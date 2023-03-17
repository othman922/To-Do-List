import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import Erroe404 from "../pages/erroe404";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useTranslation } from "react-i18next";

const About = () => {
  const [user, loading, error] = useAuthState(auth);
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Erroe404 />;
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Support Page</title>
            <style type="text/css">{`
          .Light h1 {
            color: black
          }  
          `}</style>
          </Helmet>
          <Header />
          <main>
            <h1>
              {i18n.language === "en" && "Support Page"}
              {i18n.language === "de" && "Hilfe Seite"}
              {i18n.language === "ar" && "صفحة المساعدة"}
              
            </h1>
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default About;

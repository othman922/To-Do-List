import "./Home.css";
import HomeModal from "./modal";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Snackbar from "shared/Snackbar";
import Loading from "../../comp/Loading";
import AllTasksSection from "./AllTasksSection";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";




const Home = () => {
  const { i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);



  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
    });
  };


  // ===============================
  //    FUNCTIONS of Modal
  // ===============================
  const [showModal, setshowModal] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const [taskTitle, settitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");

  const closeModal = () => {
    setshowModal(false);
    settitle("");
    setarray([]);
  };

  const titleInput = (eo) => {
    settitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask)) {
      array.push(subTask);
    }

    console.log(array);
    setsubTask("");
  };



  const submitBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    const taskId = new Date().getTime();


    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      details: array,
      id: taskId,
      completed: false,
    });


    setshowLoading(false);
    settitle("");
    setarray([]);

    setshowModal(false);
    setshowMessage(true);

    setTimeout(() => {
      setshowMessage(false);
    }, 4000);
  };

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {i18n.language === "en" && (
              <span>Welcome</span>
            )}

            {i18n.language === "ar" && (
              <span> 🔥🔥 مرحبا</span>
            )}

            {i18n.language === "de" && (
              <span>Willkommen 🔥🔥</span>
            )}
          </h1>
          {i18n.language === "en" && (
            <p className="pls">
              Please{" "}
              <Link style={{ fontSize: "30px" }} to="/signin">
                sign in
              </Link>{" "}
              to continue...{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>
          )}

          {i18n.language === "ar" && (
            <p dir="rtl" className="pls mt">
              من فضلك قم ب
              <Link style={{ fontSize: "30px" }} to="/signin">
                {" "}
                تسجيل الدخول {" "}
              </Link>{" "}
             للإستمرار   .  .  .  .{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>
          )}

          {i18n.language === "de" && (
            <p className="pls mt">
              Bitte
              <Link style={{ fontSize: "30px" }} to="/signin">
                {" "}
                 einloggen {" "}
              </Link>{" "}
              , um fortzufahren  .  .  .{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>
          )}
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* SHOW all tasks */}
            <AllTasksSection user={user} />

            {/* Add new task BTN */}
            <section className="mt">
              <button
                dir="auto"
                onClick={() => {
                  setshowModal(true);
                }}
                className="add-task-btn"
              >
                {i18n.language === "en" && "Add new task"}
                {i18n.language === "ar" && "أضف مهمة جديدة"}
                {i18n.language === "de" && "Neue Aufgaben hinzufügen"}

                <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModal && (
              <HomeModal
                closeModal={closeModal}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                taskTitle={taskTitle}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}

            <Snackbar showMessage={showMessage} />
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;

import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import NotLoggedIn from "./components/templates/NotLoggedIn";

type Props = {
  displayComponent: ReactNode;
  reachLimit: boolean;
};

const Central: React.FC<Props> = ({ displayComponent, reachLimit }) => {
  const location = useLocation();
  const navigate = useNavigate();

  let currentView = location.pathname;

  const TEMPLATE_PATH = "/user/templates";
  const EDIT_PATH = "/user/edit";
  const PREVIEW_PATH = "/user/preview";
  const SEND_PATH = "/user/send";

  const session: null | string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;

  return (
    <div className="App">
      <header className="fixed w-full z-50">
        <Header />
      </header>

      <main className="App-header">
        {isLoggedIn && (
          <div className="primaryContents w-9/12 mx-auto bg-gray-50 pt-24">
            <div className="flex justify-between px-28">
            {currentView === EDIT_PATH || currentView === PREVIEW_PATH ? (
              <button
              onClick={(e) => {
                e.preventDefault();
                if (currentView === PREVIEW_PATH) {
                  navigate(EDIT_PATH);
                } else if (currentView === EDIT_PATH) {
                  navigate(TEMPLATE_PATH);
                }
              }}
              className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation"
              >
                {"< 戻る"}
              </button>
            ) : null}
            {currentView === EDIT_PATH ||
            (currentView === PREVIEW_PATH && !reachLimit) ? (
              <button
              onClick={(e) => {
                e.preventDefault();
                if (currentView === EDIT_PATH) {
                  navigate(PREVIEW_PATH);
                } else if (currentView === PREVIEW_PATH) {
                  navigate(SEND_PATH);
                }
              }}
              className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation"
              >
                {"次に進む >"}
              </button>
            ) : null}
            </div>
            <div className="secondaryContents">{displayComponent}</div>
          </div>
        )}

        {!isLoggedIn && <NotLoggedIn />}
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Central;

import React, { ReactNode } from "react";
import "../../App.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotLoggedIn from "./components/NotLoggedIn";

type Props = {
  displayComponent: ReactNode;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const User: React.FC<Props> = ({ displayComponent, language, setLanguage }) => {
  const session: null | string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;

  return (
    <div className="App">
      <header className="fixed w-full z-50">
        <Header />
      </header>

      <main className="App-header">
        {isLoggedIn && (
          <div className="primaryContents w-10/12 mx-auto bg-gray-50">
            <div className="secondaryContents w-10/12 mx-auto">
              {displayComponent}
            </div>
          </div>
        )}
        {!isLoggedIn && <NotLoggedIn />}
      </main>
      <Footer />
    </div>
  );
};

export default User;

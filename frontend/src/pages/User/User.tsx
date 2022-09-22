import React, { ReactNode } from "react";
import "../../App.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotLoggedIn from "./components/NotLoggedIn";

type Props = {
  displayComponent: ReactNode;
  reachLimit: boolean;
};

const User: React.FC<Props> = ({ displayComponent, reachLimit }) => {
  const session: null | string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;

  return (
    <div className="App">
      <header className="fixed w-full z-50">
        <Header />
      </header>

      <main className="App-header">
        {isLoggedIn && (
          <div className="primaryContents w-11/12 mx-auto bg-gray-50 pt-24">
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

export default User;

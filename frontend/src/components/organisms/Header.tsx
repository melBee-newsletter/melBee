import React, { useState, useEffect } from "react";
import headerLogo from "../atoms/logo.png";

function Header() {
  /*TODO: Implement a proper state management once firebase auth is implemented*/
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <div className="header px-5 drop-shadow-md">
      <a href="/">
        <img src={headerLogo} alt="melBee_logo" className="py-2" width="80" />
      </a>
      {(loggedIn) ? (
        <>
        <button className="hamburger my-3">
          <span className="hamburger_bar"></span>
          <span className="hamburger_bar"></span>
          <span className="hamburger_bar"></span>
        </button>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="">ナビゲーション1</a>
            </li>
            <li className="nav-item">
              <a href="">ナビゲーション2</a>
            </li>
            <li className="nav-item">
              <a href="">ナビゲーション3</a>
            </li>
            <li className="nav-item">
              <a href="">ナビゲーション4</a>
            </li>
            <li className="nav-item">
              <a href="">ナビゲーション5</a>
            </li>
          </ul>
        </nav>
        </>
      ) : null}
    </div>
  );
}

export default Header;

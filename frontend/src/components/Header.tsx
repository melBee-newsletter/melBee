import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const Header: FC = () => {
  const navigate = useNavigate();
  
  // ---- variables for a humberger menu ----
  // const [open, SetOpen] = useState(false);
  // const toggleFunction = () => {
  //   SetOpen((prevState) => {
  //     return !prevState;
  //   });
  // };

  const session: null | string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;
  const logoLink = isLoggedIn ? "/user" : "/";

  return (
    <div className="header drop-shadow-md">
      <div className="flex items-center justify-between">
        <a href={logoLink} className="px-5">
          <img
            src={headerLogo}
            alt="melBee_logo"
            className="py-2 logo"
            width="80"
          />
        </a>

        {isLoggedIn && (
          <>
            <nav className="nav">
              <ul className="flex items-center">
                <li className="mr-5 relative group">
                  <span
                    className={[
                      "whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-white absolute opacity-0 group-hover:opacity-100 absolute top-14 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:bottom-full before:border-4 before:border-transparent before:border-b-slate-800 text-sm",
                    ].join()}
                  >
                    登録情報
                  </span>
                  <a className="block transition hover" href="/user">
                    <FontAwesomeIcon
                      className="iconUser text-gray-800"
                      icon={faUser}
                    />
                  </a>
                </li>
                <li className="relative group">
                  <span
                    className={[
                      "whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-white absolute opacity-0 group-hover:opacity-100 absolute top-14 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:bottom-full before:border-4 before:border-transparent before:border-b-slate-800 text-sm",
                    ].join()}
                  >
                    ログアウト
                  </span>
                  <a
                    className="block transition hover"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.removeItem("isLoggedIn");
                      sessionStorage.removeItem("melbeeID");
                      alert("ログアウトされました");
                      navigate("/");
                    }}
                  >
                    <FontAwesomeIcon
                      className="iconLogout text-gray-800"
                      icon={faDoorOpen}
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

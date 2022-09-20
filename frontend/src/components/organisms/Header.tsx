import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../atoms/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const Header: FC = () => {
  const navigate = useNavigate();
  const [open, SetOpen] = useState(false);
  const toggleFunction = () => {
    SetOpen((prevState) => {
      return !prevState;
    });
  };

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
                <li className="mr-5">
                  <a className="block" href="/user">
                    <FontAwesomeIcon
                      className="iconUser text-gray-800"
                      icon={faUser}
                    />
                  </a>
                </li>
                <li>
                  <a
                    className="block"
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

import React, { useState, FC } from "react";
import headerLogo from "../atoms/logo.png";
import ToggleButton from "../molecules/ToggleButton";
import Navigation from "../molecules/Navigation";

const Header: FC = () => {
  const [open, SetOpen] = useState(false);
  const toggleFunction = () => {
    SetOpen((prevState) => {
      return !prevState;
    });
  };

  const session: null|string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;
  const logoLink = isLoggedIn ? "/user" : "/";

  return (
    <div className="header drop-shadow-md flex">
      <a href={logoLink} className="px-5">
        <img src={headerLogo} alt="melBee_logo" className="py-2" width="80" />
      </a>

      {isLoggedIn && (
        <>
          <ToggleButton
            open={open}
            controls="navigation"
            label="メニューを開きます"
            onClick={toggleFunction}
          />
          <Navigation id="navigation" open={open} />
        </>
      )}
    </div>
  );
};

export default Header;

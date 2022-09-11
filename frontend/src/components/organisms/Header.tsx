import React, { useState, useEffect, FC } from "react";
import headerLogo from "../atoms/logo.png";
import ToggleButton from "../molecules/ToggleButton";
import Navigation from "../molecules/Navigation";

const Header: FC = () => {
  /*TODO: Implement a proper state management once firebase auth is implemented*/
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [open, SetOpen] = useState(false);
  const toggleFunction = () => {
    SetOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="header drop-shadow-md flex">
      <a href="/" className="px-5">
        <img src={headerLogo} alt="melBee_logo" className="py-2" width="80" />
      </a>
      {loggedIn ? (
        <>
          <ToggleButton
            open={open}
            controls="navigation"
            label="メニューを開きます"
            onClick={toggleFunction}
          />
          <Navigation id="navigation" open={open} />
        </>
      ) : null}
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import headerLogo from "../atoms/logo.png";

function Header() {
  /*TODO: Implement a proper state management once firebase auth is implemented*/
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div>
      <img src={headerLogo} alt="melBee_logo" width="80" />
      /*TODO: Add the hamburger component*/
      {loggedIn ? <p>三</p> : null}
    </div>
  );
}

export default Header;

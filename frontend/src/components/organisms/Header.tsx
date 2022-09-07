import React, { useState, useEffect } from 'react';
import headerLogo from "../atoms/logo192.png";

function Header(){
    /*TODO: Implement a proper state management once firebase auth is implemented*/
    const [loggedIn, setLoggedIn] = useState<boolean>(false); 

    return (
        <div>
            <a href="/">
            <img src={ headerLogo } alt="melBee_logo" height={"100px"} className="logo" />
            </a>
            {/*TODO: Add the hamburger component*/}
            { loggedIn ? <p>三</p> : null }
        </div>
    );
}

export default Header;
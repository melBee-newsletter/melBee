import React from "react";
import { Link } from "react-router-dom";

function SendComplete() {
  const session: null|string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;

  return (
    <>
    {isLoggedIn && 
    <div id="completeArea" style={{ backgroundColor: "beige" }}>
      <h3>Send your message!!</h3>
      <div>
        <Link to={"/user/send/"}>宛先を追加する &gt;</Link>
        <Link to={"/user/templates"}>続けて新規作成 &gt;</Link>
      </div>
    </div>
    }

    {!isLoggedIn && 
      <div style={{ backgroundColor: "gray" }}>
        <h1>melBeeはログインした方のみご利用になれます。</h1>
      </div>
    }
    </>
  );
}

export default SendComplete;

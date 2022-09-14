import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../atoms/logo.png";

function SendComplete() {
  const session: null|string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;

  return (
    <>
    {isLoggedIn && 
    <div id="completeArea" style={{ backgroundColor: "beige" }} >
      <div className="flex justify-center">
        <div>
          <img src={headerLogo} alt="melbee-logo" className="py-2" width="200" />
          <h3>送信完了しました</h3>
          <br />
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          <Link to={"/user/send/"} className="bg-sky-400 text-white rounded pr-4 pl-4">宛先を追加</Link>
        </div>
        <div>
          <Link to={"/user/templates"} className="bg-amber-300 text-white rounded pr-4 pl-4">新規作成</Link>
        </div>
      </div>
      <br />
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

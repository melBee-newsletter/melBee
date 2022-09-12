import React from "react";
import { Link } from "react-router-dom";

function SendComplete() {
  return (
    <div id="completeArea" style={{ backgroundColor: "beige" }}>
      <h3>Send your message!!</h3>
      <div>
        <Link to={"/user/send/"}>宛先を追加する &gt;</Link>
        <Link to={"/user/templates"}>続けて新規作成 &gt;</Link>
      </div>
    </div>
  );
}

export default SendComplete;

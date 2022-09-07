import React from "react";

function Signup() {
  return (
    <div>
      <h1>新規登録</h1>
      <form>
        <label htmlFor="mail_signup">新規登録</label>
        <input
          type="mail"
          name=""
          placeholder="youremail@example.com"
          id="mail_signup"
        />
        <label htmlFor="password_signup">パスワード</label>
        <input type="password" name="" id="password_signup" />
        <input type="submit" value="新規登録する"></input>
      </form>
    </div>
  );
}

export default Signup;

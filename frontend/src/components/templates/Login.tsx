import React from "react";

function Login() {
  return (
    <div>
      <h1>ログイン</h1>
      <form>
        <label htmlFor="mail">メールアドレス</label>
        <input
          type="mail"
          name=""
          placeholder="youremail@example.com"
          id="mail"
        />
        <label htmlFor="">パスワード</label>
        <input type="password" name="" id="パスワード" />
        <input type="submit" value="ログインする"></input>
      </form>
    </div>
  );
}

export default Login;

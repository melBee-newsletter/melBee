import React from "react";

function Login() {
  return (
    <div>
      <h1>ログイン</h1>
      <form id="login-form">
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          name=""
          placeholder="youremail@example.com"
          id="email"
        />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="" id="password" />
      <input type="button" value="ログインする" />
      </form>
    </div>
  );
}

export default Login;

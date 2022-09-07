import React from "react";

function Signup() {
  return (
    <div>
      <h1>新規登録</h1>

      <form>
        <label htmlFor="mail">メールアドレス</label>
        <input type="mail" name="" id="mail" />
        <label htmlFor="">パスワード</label>
        <input type="password" name="" id="パスワード" />
        <input type="submit" value="登録する"></input>
      </form>
    </div>
  );
}

export default Signup;

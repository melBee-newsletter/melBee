import React, { useContext, useEffect } from "react";
import { LogInForm } from "./Interfaces";
import axios, { AxiosResponse, AxiosError } from "axios";

type Props = {
  email: string;
};

const Login: React.FC<Props> = ({ email }) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

  const handleSubmit = () => {
    const form: LogInForm | null = document.getElementById("login-form");
    const email: string = form!["email"]!.value;
    const password: string = form!["password"]!.value;

    axios({
      method: "post",
      url: `${BASE_URL}/user/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form id="login-form">
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          name=""
          value={email}
          placeholder="youremail@example.com"
          id="email"
        />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="" id="password" />
        <input type="button" value="ログインする" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Login;

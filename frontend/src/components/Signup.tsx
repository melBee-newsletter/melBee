import React from "react";
import { SignUpForm } from "./Interfaces";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from "axios";
import { clickEvent, Props } from "../type";

const Signup: React.FC<Props["email"]> = ({ email }) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

  const navigate = useNavigate();
  const USER_PORTAL = "/user";

  const handleSubmit = (e: clickEvent) => {
    const form: SignUpForm | null = document.getElementById("signup-form");
    const email: string = form!["email_signup"]!.value;
    const password: string = form!["password_signup"]!.value;
    if (!email) alert("eメールを設定してください");
    if (!password) alert("パスワードを設定してください");
    if (email && password) {
      axios({
        method: "post",
        url: `${BASE_URL}/user/signup`,
        data: {
          email: email,
          password: password,
        },
      })
        .then((res: AxiosResponse) => {
          sessionStorage.setItem("melbeeID", res.data.id);
          sessionStorage.setItem("isLoggedIn", "true");
          navigate(USER_PORTAL);
        })
        .catch((err: AxiosError<{ error: string }>) => {
          window.alert("パスワードが入力されていません。");
        });
    }
  };

  return (
    <div className="bg-white p-5 shadow-xl z-50 ml-6">
      <h1 className="mb-5 ttl_top text-lg">新規登録</h1>
      <form id="signup-form">
        <div className="lg:flex mb-4">
          <label htmlFor="email_signup" className="lg:w-52 text-base">
            メールアドレス
          </label>
          <input
            type="email"
            autoComplete="email"
            defaultValue={email}
            className="border-solid border border-gray-300 p-1"
            name="signup"
            placeholder="youremail@example.com"
            id="email_signup"
          />
        </div>
        <div className="lg:flex mb-4">
          <label htmlFor="password_signup" className="lg:w-52 text-base">
            パスワード
          </label>
          <input
            className="border-solid border border-gray-300 p-1 bg-gray-100 focus:bg-white"
            type="password"
            autoComplete="new-password"
            name="signup"
            id="password_signup"
          />
        </div>
        <input
          type="button"
          className="rounded-xl px-4 py-2 drop-shadow-xl text-white font-medium bg-blueGradation mt-6 text-sm"
          value="新規登録"
          onClick={handleSubmit}
        ></input>
      </form>
    </div>
  );
};
export default Signup;

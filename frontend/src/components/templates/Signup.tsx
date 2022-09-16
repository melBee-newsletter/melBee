import React from "react";
import { SignUpForm } from "./Interfaces";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from "axios";

type Props = {
  email: string;
};

const Signup: React.FC<Props> = ({ email }) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

  const navigate = useNavigate();
  const TEMPLATE_PATH = "/user/templates";

  const handleSubmit = () => {
    const form: SignUpForm | null = document.getElementById("signup-form");
    const email: string = form!["email_signup"]!.value;
    const password: string = form!["password_signup"]!.value;

    axios({
      method: "post",
      url: `${BASE_URL}/user/signup`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res: AxiosResponse) => {
        // TODO: Show something when successfully singed up
        sessionStorage.setItem("melbeeID", res.data.id);
        sessionStorage.setItem("isLoggedIn", "true");
        navigate(TEMPLATE_PATH);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        // TODO: Show something when error caused
        window.confirm("パスワードが入力されていません。");
        console.log(err.response!.data);
      });
  };

  return (
    <div className="bg-white p-5 shadow-xl z-50 ml-6">
      <h1 className="mb-5 ttl_top text-lg">新規登録</h1>
      <form id="signup-form">
        <div className="lg:flex mb-4">
          <label htmlFor="email_signup" className="lg:w-52 text-base">
            新規登録
          </label>
          <input
            type="email"
            value={email}
            className="border-solid border border-gray-300 p-1"
            name=""
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
            name=""
            id="password_signup"
          />
        </div>
        <input
          type="button"
          className="mt-6 p-2 color-yellow text-sm"
          value="新規登録する"
          onClick={handleSubmit}
        ></input>
      </form>
    </div>
  );
};
export default Signup;

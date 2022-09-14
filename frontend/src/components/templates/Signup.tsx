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
        console.log(res.data);
        navigate(TEMPLATE_PATH);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        // TODO: Show something when error caused
        window.confirm("パスワードが入力されていません。");
        console.log(err.response!.data);
      });
  };

  return (
    <div className="display">
      <h1>新規登録</h1>
      <form id="signup-form">
        <label htmlFor="email_signup">新規登録</label>
        <input
          type="email"
          value={email}
          name=""
          placeholder="youremail@example.com"
          id="email_signup"
        />
        <label htmlFor="password_signup">パスワード</label>
        <input type="password" name="" id="password_signup" />
        <input
          type="button"
          value="新規登録する"
          onClick={handleSubmit}
        ></input>
      </form>
    </div>
  );
};
export default Signup;

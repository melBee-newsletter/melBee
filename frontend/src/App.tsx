import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { EmailForm } from "./components/templates/Interfaces";
import axios, { AxiosResponse, AxiosError } from "axios";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Login from "./components/templates/Login";
import Signup from "./components/templates/Signup";

function App() {
  const BASE_URL = "http://localhost:8000";

  const handleSubmit = () => {
    const form: EmailForm | null = document.getElementById("mailForm");
    const email: string = form!["email_signup"]!.value;

    axios({
      method: "post",
      url: `${BASE_URL}/user/check`,
      data: {
        email: email,
      },
    })
      .then((res: AxiosResponse) => {
        // TODO: Show something when successfully singed up
        console.log(res.data);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        // TODO: Show something when error caused
        console.log(err.response!.data);
      });
  };

  return (
    <div className="App">
      <Header />
      <main className="App-header">
        <div className="flex">
          <div className="contentLeft">
            <h2 className="mainTtl text-left text-8xl font-bold">
              想い<span className="font-light">を</span>
              <br />
              カタチ<span className="font-light">に</span>
            </h2>
            <p className="text-left leading-loose">
              melBeeは、さまざまなデザインテンプレート
              <br />
              の中から招待状やメルマガを作り、
              <br />
              相手にそのまま送信もできる デザインツールです。
              <br />
              あなたの「作りたい！」がきっとある。 <br />
              デザインをもっと身近に、簡単に。
            </p>
          </div>
          <div className="contentCenter flex text-base">
            <p>無料でログインまたは新規登録</p>
            <p>Let's get started with…</p>
          </div>
          <div className="contentRight">
            <div>
              <form id="mailForm">
                <input
                  type="mail"
                  name=""
                  placeholder="youremail@example.com"
                  id="email_signup"
                />
                <input
                  type="submit"
                  value="新規登録する"
                  onClick={handleSubmit}
                ></input>
              </form>
            </div>
            <Login />
            <Signup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Login from "./components/templates/Login";
import Signup from "./components/templates/Signup";
import EditorBox from "./components/templates/EditorBox";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-header">
        <div className="flex">
          <div className="contentLeft">
            <h2 className="text-left text-8xl font-bold">
              想い<span className="font-light">を</span>
              <br />
              カタチ<span className="font-light">に</span>
            </h2>
            <p>
              melBeeは、さまざまなデザインテンプレートの中から招待状やメルマガを作り、
              <br />
              相手にそのまま送信もできる デザインツールです。
              <br />
              あなたの「作りたい！」がきっとある。 <br />
              デザインをもっと身近に、簡単に。
            </p>
          </div>
          <div className="contentRight">
            <div>
              <p>無料でログインまたは新規登録</p>
              <p>Let's get started with…</p>
            </div>
            <div>
              <form action="">
                <input
                  type="password"
                  name=""
                  placeholder="youremail@example.com"
                  id="password_signup"
                />
                <input type="submit" value="新規登録する"></input>
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

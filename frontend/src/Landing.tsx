import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "./Landing.css";
import { EmailForm } from "./components/templates/Interfaces";
import axios, { AxiosResponse, AxiosError } from "axios";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Login from "./components/templates/Login";
import Signup from "./components/templates/Signup";

function Landing() {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
  const [isUserSignnedUP, setisUserSignnedUP] = useState(false);
  const [isEmailSubmitted, setisEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const session: null | string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

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
        setisEmailSubmitted(true);
        if (res.data["isUserSignnedUp"] === true) {
          setisUserSignnedUP(true);
        } else {
          setisUserSignnedUP(false);
        }
      })
      .catch((err: AxiosError<{ error: string }>) => {
        // TODO: Show something when error caused
        console.log(err.response!.data);
      });
  };

  return (
    <div className="App top">
      <Header />
      <main className="main_top">
        <div className="mv mainMiddle_top">
          <div className="lg:flex lg:justify-center">
            <div className="lg:flex contentL_top lg:justify-between lg:items-center">
              <div>
                <h2 className="mainTtl text-left font-bold">
                  想い<span className="font-light text-7xl">を</span>
                  <br />
                  カタチ<span className="font-light text-7xl">に</span>
                </h2>
                <p className="text-left leading-loose text-base z-20">
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
              {!isLoggedIn && (
                <div className="flex text-base writing-v border-r border-slate-800 pr-4">
                  <p className="mb-3 text-base text-gray-500">
                    ログインまたは無料で新規登録
                  </p>
                  <p className="text-base font-bold text-gray-600">
                    Let's get started with…
                  </p>
                </div>
              )}
            </div>
            {!isLoggedIn && (
              <div className="contentR_top lg:flex lg:justify-center lg:items-center">
                <div>
                  <form id="mailForm">
                    {!isEmailSubmitted && (
                      <>
                        <div className="relative">
                          <input
                            type="mail"
                            name=""
                            value={email}
                            className="inputArea bg-gray-100 border-gray rounded lg:w-96"
                            onChange={(e) => handleChange(e)}
                            placeholder="youremail@example.com"
                            id="email_signup"
                          />
                          <button
                            type="button"
                            className="lg:absolute lg:top-1.5 submitBtn"
                            onClick={handleSubmit}
                          >
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="bg-yellow-300 p-3 rounded-3xl text-white"
                            />
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
                {isUserSignnedUP && isEmailSubmitted && <Login email={email} />}
                {isEmailSubmitted && !isUserSignnedUP && (
                  <Signup email={email} />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Landing;

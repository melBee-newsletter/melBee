import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import "./Landing.css";
import { EmailForm } from "../../components/Interfaces";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import { checkEmail } from "../../api";
import { useTranslation, initReactI18next } from "react-i18next";

const Landing: React.FC = () => {
  const session: null | string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;

  const [isUserSignnedUP, setisUserSignnedUP] = useState(false);
  const [isEmailSubmitted, setisEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const form: EmailForm | null = document.getElementById("mailForm");
    const email: string = form!["email_signup"]!.value;

    const foundEmail = await checkEmail(email);
    setisEmailSubmitted(true);
    setisUserSignnedUP(foundEmail);
  };

  const { t } = useTranslation();

  return (
    <div className="App top">
      <Header />
      <main className="main_top before:invisible after:invisible md:before:visible md:after:visible md:w-11/12 lg:w-full md:mx-auto lg:mx-0">
        <div className="mv mainMiddle_top before:invisible md:before:visible">
          <div className="lg:flex lg:justify-center">
            <div className="w-screen pr-5 md:w-[670px] lg:flex z-50 md:pl-5 lg:justify-between lg:items-center">
              <div>
                <h2 className="mainTtl text-left font-bold">
                  {t("想い")}
                  <span className="font-light text-5xl md:text-7xl">
                    {t("を")}
                  </span>
                  <br />
                  {t("カタチ")}
                  <span className="font-light text-5xl md:text-7xl ">
                    {t("に")}
                  </span>
                </h2>
                <p className="text-left leading-loose text-base z-20">
                  {t("melBeeは、さまざまなデザインテンプレート")}
                  <br />
                  {t("の中から招待状やメルマガを作り、")}
                  <br />
                  {t("相手にそのまま送信もできる デザインツールです。")}
                  <br />
                  {t("あなたの「作りたい！」がきっとある。")} <br />
                  {t("デザインをもっと身近に、簡単に。")}
                </p>
              </div>
              {!isLoggedIn && (
                <div className="flex md:my-4 lg:my-0 text-base verticalText border-r border-slate-800 pr-4 invisible md:visible">
                  <p className="mb-3 text-base text-gray-500">
                    {t("ログインまたは無料で新規登録")}
                  </p>
                  <p className="text-base font-bold text-gray-600">
                    Let's get started with…
                  </p>
                </div>
              )}
            </div>
            {!isLoggedIn && (
              <div className="md:w-[504px] md:flex lg:justify-center md:items-center md:ml-5 lg:ml-0">
                <div>
                  {!isEmailSubmitted && (
                    <>
                      <div className="relative">
                        <form id="mailForm" onSubmit={handleSubmit}>
                          <input
                            type="email"
                            autoComplete="email"
                            defaultValue={email}
                            className="inputArea bg-gray-100 border-gray rounded lg:w-96"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="youremail@example.com"
                            id="email_signup"
                          />
                          {email ? (
                            <button className="md:absolute md:top-1.5 right-[-16px]">
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="bg-yellow-300 p-3 rounded-3xl text-white"
                              />
                            </button>
                          ) : (
                            <button
                              disabled={true}
                              className="md:absolute md:top-1.5 right-[-16px]"
                            >
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="grayscale bg-yellow-300 p-3 rounded-3xl text-white"
                              />
                            </button>
                          )}
                        </form>
                      </div>
                    </>
                  )}
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
};

export default Landing;

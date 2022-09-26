import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { EmailForm } from "../../../components/Interfaces";
import headerLogo from "../assets/logo.png";
import Login from "../../../components/Login";
import Signup from "../../../components/Signup";
import { checkEmail } from "../../../api"
import { useTranslation } from "react-i18next";

const NotLoggedIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isUserSignnedUP, setisUserSignnedUP] = useState(false);
  const [isEmailSubmitted, setisEmailSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const form: EmailForm | null = document.getElementById("mailForm");
    const email: string = form!["email_signup"]!.value;

    const foundEmail = await checkEmail(email);
    setisEmailSubmitted(true);
    setisUserSignnedUP(foundEmail);
  };

  return (
    <div className="h-screen justify-center pt-48">
      <div className="flex justify-center mb-6">
        <img src={headerLogo} alt="melBee_logo" className="animate-pulse" width="200" />
      </div>
      <h1 className="text-2xl mb-8">{t("melBeeはログインされた方のみご利用になれます。")}</h1>
        <p className="text-xl mb-3 text-gray-500">
          {t("ログインまたは無料で新規登録")}
        </p>
        <div className="flex justify-center items-center">
            {!isEmailSubmitted && (
              <div className="">
                <form id="mailForm" onSubmit={handleSubmit} className="flex items-center items-center">
                  <input
                    type="mail"
                    value={email}
                    className="inputArea bg-gray-100 border-gray rounded lg:w-96"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@example.com"
                    id="email_signup"
                  />
                  {email ? <button 
                    className="">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="bg-yellow-300 p-3 rounded-3xl text-white"
                      />
                    </button> :
                    <button 
                      disabled={true}
                      className="">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="grayscale bg-yellow-300 p-3 rounded-3xl text-white"
                      />
                    </button>}
                </form>
              </div>
            )}
          </div>
          {isUserSignnedUP && isEmailSubmitted && <Login email={email} />}
          {isEmailSubmitted && !isUserSignnedUP && <Signup email={email} />}
    </div>
  );
};

export default NotLoggedIn;
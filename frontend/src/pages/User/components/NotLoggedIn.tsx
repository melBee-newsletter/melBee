import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { EmailForm } from "../../../components/Interfaces";
import axios, { AxiosResponse, AxiosError } from "axios";
import headerLogo from "../assets/logo.png";
import Login from "../../../components/Login";
import Signup from "../../../components/Signup";

const NotLoggedIn: React.FC = () => {
    const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
    const [isUserSignnedUP, setisUserSignnedUP] = useState(false);
    const [isEmailSubmitted, setisEmailSubmitted] = useState(false);
  
    const [email, setEmail] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = (e: React.ChangeEvent<any>): void => {
      e.preventDefault();
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
      <div className="justify-center">
        <div className="flex justify-center mb-6">
          <img src={headerLogo} alt="melBee_logo" className="animate-pulse" width="200" />
        </div>
        <h1 className="text-2xl mb-8">melBeeはログインされた方のみご利用になれます。</h1>
          <p className="text-xl mb-3 text-gray-500">
            ログインまたは無料で新規登録
          </p>
          {/* <div className="felx justify-center items-center"> */}
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
      // </div>
    );
};

export default NotLoggedIn;
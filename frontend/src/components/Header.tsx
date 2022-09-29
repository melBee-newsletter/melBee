import React from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../assets/logo-no-text.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { clickEvent } from "../type";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    backend: {
      loadPath: "translation/{{lng}}/translation.json",
    },
    fallbackLng: "jpn",
    detection: {
      order: ["localStorage", "sessionStorage", "htmlTag", "subdomain"],
      caches: ["cookie", "localStorage"],
    },
  });

const Header: React.FC = () => {
  const navigate = useNavigate();
  const session: null | string = sessionStorage.getItem("isLoggedIn");
  const isLoggedIn = true ? session != null : false;
  const logoLink = isLoggedIn ? "/user" : "/";

  const handleLogout = (e: clickEvent) => {
    e.preventDefault();
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("melbeeID");
    localStorage.removeItem("melBeeTempStoragedraft");
    navigate("/");
  };

  const languages = [
    {
      code: "jpn",
      name: "日本語",
      country_code: "jpn",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
    {
      code: "fr",
      name: "Français",
      country_code: "fr",
    },
    {
      code: "pt",
      name: "Português",
      country_code: "br",
    },
  ];

  // const currentLanguageCode = localStorage.getItem("i18nextLng");
  // const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  return (
    <div className="header drop-shadow-md py-1 w-screen md:w-full fixed">
      <div className="flex items-end justify-between">
        <a href={logoLink} className="py-1">
          <img
            src={headerLogo}
            alt="melBee_logo"
            className="w-[38px] md:w-[45px]"
          />
        </a>
        <>
          <nav className="mr-5">
            <ul className="flex items-end py-1 navArea">
              <div className="">
                <div className="language-select relative mr-5">
                  <button
                    className="font-medium border-gray-400 border rounded-lg text-sm px-4 py-2 text-center inline-flex items-center bg-white"
                    type="button"
                    id="dropdownButton"
                  >
                    {t("LANGUAGE")} ▼
                  </button>
                  <ul className="z-10 w-32 bg-white rounded divide-gray-100 shadow dark:bg-gray-700py-1 text-sm text-gray-700 dropdown__lists">
                    {languages.map(({ code, name, country_code }) => (
                      <li
                        className="block hover:bg-gray-100 border-b-2 border-gray-100 last:border-b-0"
                        key={country_code}
                      >
                        <button
                          className="py-2 text-sm text-center inline-flex items-center"
                          onClick={(e: clickEvent) => {
                            i18n.changeLanguage(code);
                          }}
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {isLoggedIn && (
                <>
                  <li className="mr-5 relative group">
                    <span
                      className={[
                        "whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-white absolute opacity-0 group-hover:opacity-100 absolute top-10 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:bottom-full before:border-4 before:border-transparent before:border-b-slate-800 text-sm",
                      ].join()}
                    >
                      {t("登録情報")}
                      <div></div>
                    </span>
                    <a className="block transition hover" href="/user">
                      <FontAwesomeIcon
                        className="text-gray-800 h-[28px] md:h-[32px] md:w-[28px] "
                        icon={faUser}
                      />
                    </a>
                  </li>
                  <li className="relative group">
                    <span
                      className={[
                        "whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-white absolute opacity-0 group-hover:opacity-100 absolute top-10 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:bottom-full before:border-4 before:border-transparent before:border-b-slate-800 text-sm",
                      ].join()}
                    >
                      {t("ログアウト")}
                    </span>
                    <a
                      className="block transition hover"
                      href="/"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon
                        className="text-gray-800 h-[28px] md:h-[32px] md:w-[36px]"
                        icon={faDoorOpen}
                      />
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </>
      </div>
    </div>
  );
};

export default Header;

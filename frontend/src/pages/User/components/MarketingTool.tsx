import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Event, clickEvent, SNS } from "../../../type";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

type Props = {
  analytics: string;
  setAnalytics: Function;
  expand: boolean;
  setExpand: Function;
};

const Profile: React.FC<Props> = ({
  analytics,
  setAnalytics,
  expand,
  setExpand,
}) => {
  const DOWN = "rotate-90";
  const UP = "-rotate-90";
  const [direction, setDirection] = useState<string>(DOWN);

  const handleExpand = (e: clickEvent) => {
    e.preventDefault();
    setExpand({ marketingTool: !expand });
  };

  const { t } = useTranslation();

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  const [editMode, setEditMode] = useState<boolean>(true);
  const [infoFetched, setInfoFetched] = useState<boolean>(false);
  const [SNS, setSNS] = useState<SNS>({
    facebook: "",
    instagram: "",
    twitter: "",
  });
  const [homepage, setHomepage] = useState<string>("");

  function checkExternalInfo() {
    let hasExternalInfo = false;
    if (analytics || homepage || SNS.facebook || SNS.instagram || SNS.twitter) {
      hasExternalInfo = true;
    }
    return hasExternalInfo;
  }

  useEffect(() => {
    //TO DO: GET external links and set in all areas
    setAnalytics("");
    setSNS({
      facebook: "",
      instagram: "",
      twitter: "",
    });
    setHomepage("");

    setInfoFetched(true);
  }, []);

  useEffect(() => {
    setEditMode(!checkExternalInfo());
  }, [infoFetched]);

  const confirmUpdate = (e: clickEvent) => {
    e.preventDefault();
    //TO DO: compile data from the input, and call axios to patch data. (once done, then change edit mode to false.)
    setEditMode(false);
  };

  const enableEdit = (e: clickEvent) => {
    e.preventDefault();
    setEditMode(true);
  };

  return (
    <div className="justify-center mb-10 md:px-5 lg:px-10  py-6 border rounded-lg drop-shadow-xl bg-white">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleExpand}
      >
        <p className="text-xl font-medium">{t("マーケティングツール")}</p>
        <span className={direction}>
          <FontAwesomeIcon
            className="bg-yellow-200 rounded-lg p-1.5"
            icon={faArrowRight}
          />
        </span>
      </div>
      {expand && (
        <div className="flex flex-col mt-4">
          <div>
            {editMode ? (
              <div>
                <form>
                  <div className="mb-6 flex w-full justify-between items-center">
                    <label
                      htmlFor="analyticsTag"
                      className="w-[250px] text-left cursor-pointer align-middle"
                    >
                      {t("Analyticsタグの設定")}
                    </label>
                    <input
                      type="text"
                      onChange={(e: Event) => setAnalytics(e.target.value)}
                      defaultValue={analytics}
                      placeholder={t("Google Analyticsタグ")}
                      id="analyticsTag"
                      className="border rounded-lg p-2 w-full"
                    ></input>
                  </div>
                  <div>
                    <p className="mb-2 text-left">{t("SNSの設定")}</p>
                    <ul className="mb-6">
                      <li className="text-left mb-3 flex justify-between items-center">
                        {" "}
                        <label
                          htmlFor="facebook"
                          className="cursor-pointer w-[250px] flex-nowrap"
                        >
                          <span className="mr-2">
                            <FontAwesomeIcon
                              icon={faFacebook}
                              className="w-[25px] h-full align-middle"
                            />
                          </span>{" "}
                          facebook.com/
                        </label>
                        <input
                          type="text"
                          defaultValue={SNS.facebook}
                          onChange={(e: Event) =>
                            (SNS.facebook = e.target.value)
                          }
                          placeholder={t("アカウント名")}
                          id="facebook"
                          className="border rounded-lg p-2 w-full"
                        ></input>
                      </li>
                      <li className="text-left mb-3 flex justify-between items-center">
                        {" "}
                        <label
                          htmlFor="twitter"
                          className="cursor-pointer w-[250px]"
                        >
                          <span className="mr-2">
                            <FontAwesomeIcon
                              icon={faTwitter}
                              className="w-[25px] h-full align-middle"
                            />
                          </span>{" "}
                          twitter.com/
                        </label>
                        <input
                          type="text"
                          defaultValue={SNS.twitter}
                          onChange={(e: Event) =>
                            (SNS.twitter = e.target.value)
                          }
                          placeholder={t("アカウント名")}
                          id="twitter"
                          className="border rounded-lg p-2 w-full"
                        ></input>
                      </li>
                      <li className="text-left mb-3 flex justify-between items-center">
                        {" "}
                        <label
                          htmlFor="instagram"
                          className="cursor-pointer w-[250px]"
                        >
                          <span className="mr-2">
                            <FontAwesomeIcon
                              icon={faInstagram}
                              className="w-[25px] h-full align-middle"
                            />
                          </span>{" "}
                          instagram.com/
                        </label>
                        <input
                          type="text"
                          defaultValue={SNS.instagram}
                          onChange={(e: Event) =>
                            (SNS.instagram = e.target.value)
                          }
                          placeholder={t("アカウント名")}
                          id="instagram"
                          className="border rounded-lg p-2 w-full"
                        ></input>
                      </li>
                    </ul>
                    <div className="flex w-full justify-between items-center">
                      {/* <p className="mb-2">ホームページを設定する</p> */}
                      <label
                        htmlFor="homepage"
                        className="cursor-pointer w-[250px] text-left"
                      >
                        ホームページを設定する
                      </label>
                      <input
                        type="url"
                        defaultValue={homepage}
                        onChange={(e: Event) => setHomepage(e.target.value)}
                        placeholder="www.homepage.com"
                        id="homepage"
                        className="border rounded-lg p-2 w-full"
                      ></input>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={confirmUpdate}
                      className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation mt-4"
                    >
                      設定
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-left">
                {/* <h3 className="mt-4 mb-2 font-bold">Google Analytics</h3> */}
                {analytics ? (
                  <p className="mb-6">
                    {t("Analyticsタグの設定")} {analytics}
                  </p>
                ) : (
                  <p className="mb-6">{t("Analyticsタグの設定 未設定")}</p>
                )}

                <p className="mb-2">{t("SNSの設定")}</p>
                <p className="mb-3">
                  <span className="mr-2">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="w-[25px] h-full align-middle"
                    />
                  </span>
                  {SNS.facebook ? (
                    <a
                      href={`facebook.com/${SNS.facebook}`}
                      target="_blank"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>facebook.com/{SNS.facebook}</span>
                    </a>
                  ) : (
                    <span>{t("未設定")}</span>
                  )}
                </p>

                <p className="mb-3">
                  <span className="mr-2">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="w-[25px] h-full align-middle"
                    />
                  </span>
                  {SNS.twitter ? (
                    <a
                      href={`twitter.com/${SNS.twitter}`}
                      target="_blank"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>twitter.com/{SNS.twitter}</span>
                    </a>
                  ) : (
                    <span>{t("未設定")}</span>
                  )}
                </p>

                <p className="mb-6">
                  <span className="mr-2">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="w-[25px] h-full align-middle"
                    />
                  </span>
                  {SNS.instagram ? (
                    <a
                      href={`http://instagram.com/${SNS.instagram}`}
                      target="_blank"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>instagram.com/{SNS.instagram}</span>
                    </a>
                  ) : (
                    <span>{t("未設定")}</span>
                  )}
                </p>

                {/* <h3 className="mt-4 mb-2 font-bold">ホームページ</h3> */}
                <p>
                  <span className="mr-1">{t("ホームページを設定する")}</span>
                  {homepage ? (
                    <a
                      href={`http://${homepage}`}
                      target="_blank"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>{homepage}</span>
                    </a>
                  ) : (
                    <span>未設定</span>
                  )}
                </p>

                <div className="flex justify-center mt-4">
                  <button
                    className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation"
                    onClick={enableEdit}
                  >
                    {t("編集")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

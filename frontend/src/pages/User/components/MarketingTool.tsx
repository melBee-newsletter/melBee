import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  Event,
  clickEvent,
  externalLinks,
  Props,
  externalInfo,
} from "../../../type";
import { externalInfoAPI } from "../api";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const MarketingTool: React.FC<Props["marketingTool"]> = ({
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
  const [externalInfo, setExternalInfo] = useState<externalLinks>({
    facebookID: "",
    instagramID: "",
    twitterID: "",
    homepage: "",
  });

  useEffect(() => {
    let hasExternalInfo: boolean = false;
    (async function getExternalInfo() {
      await externalInfoAPI
        .get()
        .then((externalInfo: externalInfo) => {
          setExternalInfo(externalInfo.externalLinks);
          setAnalytics(externalInfo.analyticsID);
          for (const info in externalInfo.externalLinks) {
            if (externalInfo.externalLinks[info] || externalInfo.analyticsID) {
              hasExternalInfo = true;
            }
          }
        })
        .then(() => {
          setEditMode(!hasExternalInfo);
        });
    })();
  }, []);

  const confirmUpdate = async (e: clickEvent) => {
    e.preventDefault();
    const newExternalInfo = {
      analyticsID: analytics,
      facebookID: externalInfo.facebookID,
      instagramID: externalInfo.instagramID,
      twitterID: externalInfo.twitterID,
      homepage: externalInfo.homepage,
    };
    await externalInfoAPI.update(newExternalInfo).then((updated) => {
      setEditMode(!updated);
    });
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
                          defaultValue={externalInfo.facebookID}
                          onChange={(e: Event) =>
                            (externalInfo.facebookID = e.target.value)
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
                          defaultValue={externalInfo.twitterID}
                          onChange={(e: Event) =>
                            (externalInfo.twitterID = e.target.value)
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
                          defaultValue={externalInfo.instagramID}
                          onChange={(e: Event) =>
                            (externalInfo.instagramID = e.target.value)
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
                        {t("ホームページを設定する")}
                      </label>
                      <input
                        type="url"
                        defaultValue={externalInfo.homepage}
                        onChange={(e: Event) =>
                          (externalInfo.homepage = e.target.value)
                        }
                        placeholder="www.homepage.com"
                        id="homepage"
                        className="border rounded-lg p-2 w-full"
                      ></input>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={confirmUpdate}
                      className="rounded-xl px-6 py-2 drop-shadow-xl hover:drop-shadow-none text-lg text-white font-medium bg-orangeGradation mt-4 hoverEffect"
                    >
                      {t("設定")}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-left">
                {analytics ? (
                  <p className="mb-6">
                    {" "}
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
                  {externalInfo.facebookID ? (
                    <a
                      href={`http://facebook.com/${externalInfo.facebookID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>facebook.com/{externalInfo.facebookID}</span>
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
                  {externalInfo.twitterID ? (
                    <a
                      href={`http://twitter.com/${externalInfo.twitterID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>twitter.com/{externalInfo.twitterID}</span>
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
                  {externalInfo.instagramID ? (
                    <a
                      href={`http://instagram.com/${externalInfo.instagramID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>instagram.com/{externalInfo.instagramID}</span>
                    </a>
                  ) : (
                    <span>{t("未設定")}</span>
                  )}
                </p>

                {/* <h3 className="mt-4 mb-2 font-bold">ホームページ</h3> */}
                <p>
                  <span className="mr-1">{t("ホームページを設定する")}</span>
                  {externalInfo?.homepage ? (
                    <a
                      href={`http://${externalInfo?.homepage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-500 hover:underline"
                    >
                      <span>{externalInfo.homepage}</span>
                    </a>
                  ) : (
                    <span>{t("未設定")}</span>
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

export default MarketingTool;

import React, { useEffect, useState } from "react";
import { Props } from "../../../type";
import { useTranslation } from "react-i18next";

const History: React.FC<Props["history"]> = ({
  history,
  i,
  viewHistory,
  setViewHistory,
}) => {
  const [recipients, setRecipents] = useState<string[]>([]);
  const { t } = useTranslation();

  const convertDate = (stringDate: string) => {
    const test = new Date(stringDate);
    const year = test.getFullYear();
    const month = test.getMonth() + 1;
    const date = test.getDate();
    const hour = test.getHours();
    const min = test.getMinutes();
    return (
      <span className="font-bold">{`${year}年${month}月${date}日 ${hour}時${min}分`}</span>
    );
  };

  useEffect(() =>{
    const splitRecipients = history.recipients.split(",");
    setRecipents(splitRecipients);
  }, []);

  const handleView = (position: number) => {
    const updateView = viewHistory.map((stat, i) =>
      i === position ? !stat : stat
    );
    setViewHistory(updateView);
  };

  const handleClose = (position: number) => {
    const updateView = viewHistory.map((stat, i) =>
      i === position ? !stat : stat
    );
    setViewHistory(updateView);
  };

  return (
    <div key={`history${i}`}>
      {!viewHistory[i] ? (
        <ul className="flex items-center justify-around historyList mb-2 last:mb-0 lg:w-[99%] mr-auto ml-auto">
          <li className="text-left lg:w-[265px] sm:text-sm lg:text-base">
            {t("送信日時:")} {convertDate(history.date_sent)}
          </li>
          <li className="text-left sm:text-sm lg:text-base lg:w-[300px]">
            {t("件名:")}<span className="font-bold">{history.subject}</span>
          </li>
          <li>
            {" "}
            <button
              onClick={() => handleView(i)}
              className="rounded-xl px-5 py-2 text-white bg-orangeGradation"
            >
              {t("詳細")}
            </button>
          </li>
        </ul>
      ) : (
        <div className="">
          <div className="lg:w-[88.5%] mr-auto ml-auto">
            <div className="historyInfo">
              <ul className="flex items-center historyInfoFrame">
                <li className="lg:w-[265px] text-left mb-3 mr-24">
                  <span className="titleHistory">{t("送信日時:")}</span>
                  {convertDate(history.date_sent)}
                </li>
                <li className="text-left mb-3">
                  <span className="titleHistory">{t("件名:")}</span>
                  <span className="font-bold">{history.subject}</span>
                </li>
              </ul>
              <ul className="mb-4">
                <li className="text-left lg:flex">
                  {t("送信先:")}{" "}
                  <ul className="flex flex-wrap leading-tight">
                    {recipients.map(
                      (email: string, i: number) => {
                        return (
                          <li key={`email${i}`} className="mb-2 ml-2">
                            <p>{email}</p>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </li>
              </ul>
            </div>

            <div className="">
              <div className="overflow-y-scroll templateHistory">
                <div
                  dangerouslySetInnerHTML={{
                    __html: history.template,
                  }}
                  className="block w-full"
                />
              </div>
            </div>
          </div>{" "}
          <button
            onClick={() => handleClose(i)}
            className="rounded-xl px-5 py-2 text-white text-sm text-white bg-redGradation mt-5 mb-3"
          >
            {t("閉じる")}
          </button>
        </div>
      )}
    </div>
  );
};

export default History;

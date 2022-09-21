import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import History from "../molecules/History";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type history = {
  date_sent: string;
  recipients: string;
  template: string;
  subject: string;
};

type Props = {
  expand: boolean;
  setExpand: Function;
  countSent: number;
  setCountSent: Function;
};

const SentHistory: React.FC<Props> = ({
  expand,
  setExpand,
  countSent,
  setCountSent,
}) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
  const DOWN = "rotate-90";
  const UP = "-rotate-90";
  const [direction, setDirection] = useState<string>(DOWN);
  const [sentHistory, setSentHistory] = useState<history[]>([]);
  const [viewHistory, setViewHistory] = useState<boolean[]>(
    new Array(sentHistory.length).fill(false)
  );

  const handleExpand = (e: any) => {
    e.preventDefault();
    setExpand({ history: !expand });
  };

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  useEffect(() => {
    const DATE = new Date();
    const TODAY = {
      year: DATE.getFullYear(),
      month: DATE.getMonth() + 1,
      day: DATE.getDay(),
    };
    let newCountSent = 0;
    const checkSentDate = (stringDate: string) => {
      const sentDate = new Date(stringDate);
      if (
        sentDate.getFullYear() === TODAY.year &&
        sentDate.getMonth() + 1 === TODAY.month &&
        sentDate.getDay() === TODAY.day
      ) {
        setCountSent(newCountSent += 1);
      }
    };

    axios({
      method: "get",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/sent_history`,
    })
      .then((res: AxiosResponse) => {
        let data = res.data;
        data.map((history: history) => {
          setSentHistory((current) => [history, ...current]);
          setViewHistory((prevStat) => [...prevStat, false]);
          checkSentDate(history.date_sent);
        });
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.response!.data);
      });
  }, []);

  return (
    <div className="justify-center my-2 px-10 py-6 mb-8 border rounded-lg drop-shadow-xl bg-white">
      <div
        className="flex justify-between text-lg font-medium"
        onClick={handleExpand}
      >
        <h3>送信履歴</h3>
        <span className={direction}>
          <FontAwesomeIcon
            className="bg-yellow-200 rounded-lg p-1.5"
            icon={faArrowRight}
          />
        </span>
      </div>
      {expand && (
        <div className="w-full mt-3">
          {sentHistory.length > 0 ? (
            <>
              {sentHistory.map((history, i) => {
                return (
                  <div
                    key={`history${i}`}
                    className="mb-4 pb-2 last:pb-0 last:mb-0 border-b border-gray-100 last:border-b-0"
                  >
                    {
                      <History
                        history={history}
                        i={i}
                        viewHistory={viewHistory}
                        setViewHistory={setViewHistory}
                      />
                    }
                  </div>
                );
              })}
            </>
          ) : (
            <div>
              <p className="text-xl my-4">送信履歴はまだございません</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SentHistory;

import React, { useState, useEffect } from "react";
import History from "./History";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { sentHistoryAPI } from "../api";
import { history, clickEvent, Props } from "../../../type";

const SentHistory: React.FC<Props["sentHistory"]> = ({ expand, setExpand, setCountSent }) => {
  const DOWN = "rotate-90";
  const UP = "-rotate-90";
  const [direction, setDirection] = useState<string>(DOWN);
  const [sentHistory, setSentHistory] = useState<history[]>([]);
  const [viewHistory, setViewHistory] = useState<boolean[]>(
    new Array(sentHistory.length).fill(false)
  );

  const handleExpand = (e: clickEvent) => {
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
        setCountSent((newCountSent += 1));
      }
    };
    (async function allSentHistory() {
      await sentHistoryAPI.get().then((sentHistory) => {
        sentHistory.map((history: history) => {
          setSentHistory((current) => [history, ...current]);
          setViewHistory((prevStat) => [...prevStat, false]);
          checkSentDate(history.date_sent);
        });
      });
    })();
  }, []);

  return (
    <div className="justify-center mb-10 md:px-5 lg:px-10 py-6 border rounded-lg drop-shadow-xl bg-white">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleExpand}
      >
        <h3 className="text-xl font-medium">送信履歴</h3>
        <span className={direction}>
          <FontAwesomeIcon
            className="bg-yellow-200 rounded-lg p-1.5"
            icon={faArrowRight}
          />
        </span>
      </div>
      {expand && (
        <div className="mt-4">
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

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Event = {
  target: {
    value: string;
  };
};

type clickEvent = {
  preventDefault: Function;
};

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

  const handleExpand = (e: any) => {
    e.preventDefault();
    setExpand({ profile: !expand });
  };

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  const [analyticsEdit, setAnalyticsEdit] = useState(true);

  const handleChange = (event: Event) => {
    setAnalytics(event.target.value);
  };

  const handleClick = (event: clickEvent) => {
    event.preventDefault();
    if (analytics) {
      setAnalytics(analytics);
      setAnalyticsEdit(false);
    } else {
      alert("未入力です");
    }
  };

  const handleEdit = (event: clickEvent) => {
    event.preventDefault();
    setAnalyticsEdit(true);
  };

  return (
    <div className="justify-center my-2 px-10 py-6 mb-8 border rounded-lg drop-shadow-xl bg-white">
      <div
        className="flex justify-between text-lg font-medium"
        onClick={handleExpand}
      >
        <h3>マーケティングツール</h3>
        <span className={direction}>
          <FontAwesomeIcon
            className="bg-yellow-200 rounded-lg p-1.5"
            icon={faArrowRight}
          />
        </span>
      </div>
      {expand && (
        <div className="flex mt-3">
          <div>
            {analyticsEdit ? (
              <div>
                <label>Analyticsタグ設定</label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={analytics}
                  placeholder="Google Analyticsタグ"
                  className="border rounded-lg p-2 mx-3"
                ></input>
                <button
                  onClick={handleClick}
                  className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation"
                >
                  確定
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <p className="mr-3">Google Analyticsは設定済みです</p>
                <button
                  className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation"
                  onClick={handleEdit}
                >
                  編集
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

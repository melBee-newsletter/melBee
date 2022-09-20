import React, { useEffect, useState } from "react";

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

const Profile: React.FC<Props> = ({ analytics, setAnalytics, expand, setExpand }) => {
  const DOWN = "rotate-90 text-yellow-400";
  const UP = "-rotate-90 text-yellow-400";
  const [direction, setDirection] = useState<string>(DOWN);

  const handleExpand = (e: any) => {
      e.preventDefault();
      setExpand({profile: !expand});
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
      <div className="justify-center my-2 py-4 mb-8 border-2 rounded-lg drop-shadow-xl bg-white">
          <div className="flex justify-between px-10 py-3 text-xl font-medium" onClick={handleExpand} >
              <h3>登録情報</h3>
              <span className={direction}>▷</span>
          </div>
          {(expand) && (
              <div className="flex justify-center">
              <div className="bg-white w-full text-lg">
                  <p>登録内容</p>
                <div>
                  {analyticsEdit ? (
                    <div>
                      <label>Analyticsタグの入力:</label>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={analytics}
                        placeholder="Google Analyticsタグ"
                        className="border-2 rounded-lg px-3 mx-3"
                      ></input>
                      <button onClick={handleClick} className="bg-sky-300 px-4 rounded-lg" >確定</button>
                    </div>
                  ) : (
                  <div className="justify-center">
                    <h3>Google Analyticsは設定済みです</h3>
                    <button
                      className="bg-yellow-400 pr-4 pl-4 rounded-xl"
                      onClick={handleEdit}
                    >
                      編集
                    </button>
                  </div>
                  )}
                </div>
              </div>
          </div>
          )}
      </div>
  );
};

export default Profile;
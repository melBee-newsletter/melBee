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
};

const Profile: React.FC<Props> = ({ analytics, setAnalytics }) => {
  const DOWN = "rotate-90";
  const UP = "-rotate-90";
  const [expand, setExpand] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>(DOWN);

  const handleExpand = (e: any) => {
      e.preventDefault();
      setExpand(!expand);
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
      <div className="bg-neutral-500 justify-center my-2">
          <div className="flex justify-between px-10 py-3 text-xl text-white ">
              <h3>登録情報</h3>
              <button className={direction} onClick={handleExpand}>▷</button>
          </div>
          {(expand) && (
              <div className="flex justify-center">
              <div className="bg-white w-full">
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
                      ></input>
                      <button onClick={handleClick} className="bg-sky-300 pr-4 pl-4 rounded-xl" >確定</button>
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
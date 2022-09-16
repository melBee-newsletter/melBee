import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      setAnalytics(analytics);
      setAnalyticsEdit(false);
  };

  const handleEdit = (event: clickEvent) => {
      event.preventDefault();
      setAnalyticsEdit(true);
  };

  return (
    <>
      <div>
        <button onClick={(e) => { navigate("/user/templates")}} className="bg-yellow-300 rounded-xl px-4 my-10">新規作成</button>
      </div>
      <div className="bg-sky-200 justify-center">
          <div className="flex justify-between px-10 py-3 text-xl">
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
                      className="bg-yellow-300 pr-4 pl-4 rounded-xl"
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
    </>
  );
};

export default Profile;
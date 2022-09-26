import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Event, clickEvent, SNS } from "../../../type";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

type Props = {
  analytics: string;
  setAnalytics: Function;
  expand: boolean;
  setExpand: Function;
};

const Profile: React.FC<Props> = ({ analytics, setAnalytics, expand, setExpand }) => {
  const DOWN = "rotate-90";
  const UP = "-rotate-90";
  const [direction, setDirection] = useState<string>(DOWN);

  const handleExpand = (e: clickEvent) => {
    e.preventDefault();
    setExpand({ marketingTool: !expand });
  };

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  const [editMode, setEditMode] = useState<boolean>(true);
  const [infoFetched, setInfoFetched] = useState<boolean>(false);
  const [SNS, setSNS] = useState<SNS>({facebook: "", instagram: "", twitter: ""});
  const [homepage, setHomepage] = useState<string>("");
  
  function checkExternalInfo(){
    let hasExternalInfo = false;
    if (analytics || homepage || SNS.facebook || SNS.instagram || SNS.twitter) {
      hasExternalInfo = true;
    };
    return hasExternalInfo;
  };

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
      <div className="flex justify-between cursor-pointer" onClick={handleExpand}>
        <h3 className="text-xl font-medium">
          マーケティングツール
        </h3>
        <span className={direction}> 
          <FontAwesomeIcon
            className="bg-yellow-200 rounded-lg p-1.5"
            icon={faArrowRight}
          />
        </span>
      </div>
      {expand && (
        <div className="flex justify-center mt-4">
          <div>
            {editMode ? (
              <div>
                <form>
                  <h3 className="mt-4 mb-2 font-bold">Google Analytics</h3>
                  <label>Analyticsタグ設定</label>
                  <input
                    type="text"
                    onChange={(e: Event) => setAnalytics(e.target.value)}
                    defaultValue={analytics}
                    placeholder="Google Analyticsタグ"
                    className="border rounded-lg p-2 mx-3"
                  ></input>

                  <h3 className="mt-4 mb-2 font-bold">SNS</h3>
                  <label>
                    <span className="mr-1">
                    <FontAwesomeIcon icon={faFacebook} />
                    </span>
                    {" "}
                    facebook.com/</label>
                  <input
                    type="text"
                    defaultValue={SNS.facebook}
                    onChange={(e: Event) => SNS.facebook = e.target.value}
                    placeholder="ユーザー名"
                    className="border rounded-lg p-2 mx-3"
                  ></input>
                  <br />

                  <label>
                  <span className="mr-1">
                    <FontAwesomeIcon icon={faTwitter} />
                    </span>
                    {" "} 
                    twitter.com/</label>
                  <input
                    type="text"
                    defaultValue={SNS.twitter}
                    onChange={(e: Event) => SNS.twitter = e.target.value}
                    placeholder="ユーザー名"
                    className="border rounded-lg p-2 mx-3"
                  ></input>
                  <br />

                  <label>
                  <span className="mr-1">
                    <FontAwesomeIcon icon={faInstagram} />
                    </span>
                    {" "} 
                    instagram.com/</label>
                  <input
                    type="text"
                    defaultValue={SNS.instagram}
                    onChange={(e: Event) => SNS.instagram = e.target.value}
                    placeholder="ユーザー名"
                    className="border rounded-lg p-2 mx-3"
                  ></input>

                  <h3 className="mt-4 mb-2 font-bold">ホームページ</h3>
                  <label>HP</label>
                  <input
                    type="url"
                    defaultValue={homepage}
                    onChange={(e: Event) => setHomepage(e.target.value)}
                    placeholder="www.homepage.com"
                    className="border rounded-lg p-2 mx-3"
                  ></input>
                  <br />

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
                <div>
                  <h3 className="mt-4 mb-2 font-bold">
                    Google Analytics
                  </h3>
                  {analytics ? <p>Analyticsタグ: {analytics}</p> : <span>未設定</span>}
                  
                  <h3 className="mt-4 mb-2 font-bold">
                    SNS
                  </h3>
                  <p>
                    <span className="mr-1">
                    <FontAwesomeIcon icon={faFacebook} />
                    </span>
                    {SNS.facebook ? <a href={`facebook.com/${SNS.facebook}`} target="_blank"><span>facebook.com/{SNS.facebook}</span></a> : <span>未設定</span>}
                   </p>
                  
                  <p>
                    <span className="mr-1">
                    <FontAwesomeIcon icon={faTwitter} />
                    </span>
                    {SNS.twitter ? <a href={`twitter.com/${SNS.twitter}`} target="_blank"><span>twitter.com/{SNS.twitter}</span></a> : <span>未設定</span>}
                  </p>

                  <p>
                    <span className="mr-1">
                    <FontAwesomeIcon icon={faInstagram} />
                    </span>
                    {SNS.instagram ? <a href={`http://instagram.com/${SNS.instagram}`} target="_blank"><span>instagram.com/{SNS.instagram}</span></a> : <span>未設定</span>}
                  </p>

                  <h3 className="mt-4 mb-2 font-bold">
                    ホームページ
                  </h3>
                  <p>
                    <span className="mr-1">
                    HP
                    </span>
                    {homepage ? <a href={`http://${homepage}`} target="_blank"><span>{homepage}</span></a> : <span>未設定</span>}
                  </p>

                <div className="flex justify-center">
                  <button
                    className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation"
                    onClick={enableEdit}
                    >
                    編集
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

import React, { useState } from "react";
import PrivacyPolicy from "../molecules/PrivacyPolicy";

function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);

  return (
    <>
    {showPrivacyPolicy && <PrivacyPolicy displayPP={setShowPrivacyPolicy} />}
    <footer>
      <div className="footer py-4">
        <div className="flex px-4 py-4 text-xs footer_nav">
          <p className="">©2022 melBee, Inc - ALL RIGHTS RESERVED </p>
          <button onClick={(e) => {
            e.preventDefault();
            setShowPrivacyPolicy(!showPrivacyPolicy);}}>
              プライバシーポリシー
          </button>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;

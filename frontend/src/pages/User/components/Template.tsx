import React from "react";
import { Props } from "../../../type";
import { useTranslation } from "react-i18next";

const Template: React.FC<Props["template"]> = ({ template }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="sm:mb-5 md:mb-3">
        <div className="">
          <div className="overflow-y-scroll overflow-x-hidden templateList">
            <div
              dangerouslySetInnerHTML={{
                __html: template.body,
              }}
              className="block w-full"
            />
          </div>
        </div>
      </div>
      <p className="break-all inline-block w-[73%] templateTitle">
        {t(template.title.slice(0, 20))}
      </p>
    </>
  );
};

export default Template;

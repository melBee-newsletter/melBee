import React from "react";
import { Props } from "../../../type";

const Template: React.FC<Props["template"]> = ({ template }) => {
  return (
    <>
      <p className="pb-2">{template.title.slice(0, 20)}</p>
      <div className="sm:mb-5 md:mb-2">
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
    </>
  );
};

export default Template;

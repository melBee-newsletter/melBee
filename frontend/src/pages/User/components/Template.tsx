import React from "react";
import { template } from "../../../type";

type Props = {
  template: template;
};

const Template: React.FC<Props> = ({ template }) => {
  return (
    <div className="sm:mb-5 md:mb-0">
      <div>
        <p className="pb-3">{template.title.slice(0, 20)}</p>
      </div>
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
  );
};

export default Template;

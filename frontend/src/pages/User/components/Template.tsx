import React from "react";

type Props = {
  template: {
    id: number;
    thumbnail: string;
    title: string;
    body: string;
  };
};

const Template: React.FC<Props> = ({ template }) => {
  return (
    <div className="">
      <div>
        <p className="pb-3 text-lg">{template.title.slice(0, 20)}</p>
      </div>
      <div className="">
        <div className="overflow-y-scroll overflow-x-hidden templateList">
          {/* <img src={template.thumbnail} alt="template" width={200} className="object-cover h-full w-full"/> */}
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

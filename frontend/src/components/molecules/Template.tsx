import React from "react";

type Props = {
  template: {
    thumbnail: string;
    title: string;
  };
};

const Template: React.FC<Props> = ({ template }) => {
  return (
    <div className="px-2 pb-2 pt-2" style={{ backgroundColor: "pink" }}>
      <p className="text-base pb-3">{template.title}</p>
      <div className="w-max">
        <a href="">
          <img src={template.thumbnail} alt="template" width={200} />
        </a>
      </div>
    </div>
  );
};

export default Template;

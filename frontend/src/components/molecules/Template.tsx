import React from "react";

type Props = {
  template: {
    id: number;
    thumbnail: string;
    title: string;
  };
};

const Template: React.FC<Props> = ({ template }) => {

  return (
    <div className="flex-1 justify-center px-2 py-4 h-96 bg-yellow-400 rounded-lg" >
      <div className="w-full">
          <p className="text-2xl font-bold pb-3">{template.title.slice(0, 20)}</p>
      </div>
      <div className="flex justify-center w-full">
          <img src={template.thumbnail} alt="template" width={200} />
      </div>
    </div>
  );
};

export default Template;

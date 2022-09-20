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
    <div className="flex-1 justify-center px-2 py-4 h-96 bg-yellow-400 rounded-lg">
      <div>
        <p className="text-2xl font-bold">{template.title.slice(0, 20)}</p>
      </div>
      <div className="w-full h-full px-2 py-3 pb-8">
        <div className="h-full overflow-y-scroll bg-white">
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

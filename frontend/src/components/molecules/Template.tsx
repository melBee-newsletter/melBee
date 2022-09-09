import React from 'react';
// import templateImage from "../atoms/template_sample.png";

type Props = {
    template: {
        thumbnail: string;
        title: string;
    }
}

const Template: React.FC<Props> = ({template}) => {
    return (
        <div style={{backgroundColor: "lightgray"}}>
            <p className='text-sm'>{template.title}</p>
                <a href="">
                    <img src={template.thumbnail} alt="template" width={200}/>
                </a>
        </div>
    );

};

export default Template;
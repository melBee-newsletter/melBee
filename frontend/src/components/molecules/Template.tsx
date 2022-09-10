import React from 'react';
import EditorBox from '../templates/EditorBox';

type Props = {
    template: {
        thumbnail: string;
        title: string;
    };
    setDisplayComponent: Function;
    setView: Function;
    setEditedFile: Function;
}

const Template: React.FC<Props> = ({ template, setDisplayComponent, setView, setEditedFile }) => {
    return (
        <div className='px-2 pb-2 pt-2' style={{backgroundColor: "pink"}}>
            <p className='text-base pb-3'>{template.title}</p>
            <div className='w-max'>
                <a onClick={(e) => {
                    setDisplayComponent(<EditorBox setEditedFile={setEditedFile} />);
                    setView("edit");
                }}>
                    <img src={template.thumbnail} alt="template" width={200}/>
                </a>
            </div>
        </div>
    );

export default Template;

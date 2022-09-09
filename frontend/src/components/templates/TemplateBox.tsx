import React, { useEffect, useState } from 'react';
import Template from '../molecules/Template';
import templateImage from "../atoms/template_sample.png";

type template = {
    thumbnail: string;
    title: string;
};

type Props = {
    setDisplayComponent: Function;
    setView: Function;
    setEditedFile: Function;
}

const TemplateBox: React.FC<Props> = ({ setDisplayComponent, setView, setEditedFile }) => {
    const [templates, setTemplates] = useState<template[]>([]);

    // This is just for test.
    const sample = {
        thumbnail: templateImage,
        title: "Florist",
    };

    const sample1 = {
        thumbnail: templateImage,
        title: "Wedding Invitation",
    };

    useEffect(() => {
        setTemplates(prevTemplate => [...prevTemplate, sample, sample1,]);
    },[]);

    return (
        <div style={{backgroundColor: "gray"}}>
            <h3>テンプレートをお選びください</h3>
            <div className='px-5 py-3'>
                <div className='grid gap-4 grid-cols-4 grid-rows-4'>
                    {templates.map(template => {
                        return (<Template template={template} setDisplayComponent={setDisplayComponent} setView={setView} setEditedFile={setEditedFile} />)
                    })}
                </div>
            </div>
        </div>
    );

};

export default TemplateBox;
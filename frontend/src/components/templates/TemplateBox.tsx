import React, { useEffect, useState } from 'react';
import Template from '../molecules/Template';

type template = {
    thumbnail: string;
    title: string;
};

const TemplateBox: React.FC = () => {
    const [templates, setTemplates] = useState<template[]>([]);

    // This is just for test.
    const sample = {
        thumbnail: "https://dim.mcusercontent.com/cs/f31e7d37d2b73d7d30d5e1924/images/96bb7a24-88af-90b0-b1fa-e68dc96dba9e.jpg?w=564&dpr=2",
        title: "Florist"
    };

    useEffect(() => {
            setTemplates(prevTemplate => [...prevTemplate, sample,]);
    },[]);

    return (
        <div style={{backgroundColor: "yellow"}}>
            <h3>テンプレートをお選びください</h3>
            <div className='flex flexrow'>
                <div className='basis-1/4'>
                    {templates.map(template => {
                        return (<Template template={template} />);
                    })};
                </div>
            </div>
        </div>
    );

};

export default TemplateBox;
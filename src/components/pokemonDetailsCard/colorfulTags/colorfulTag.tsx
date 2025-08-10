import React from 'react';
import { getPokcolor } from '../../../constants/pokemon.types';
import "./colorfulTags.scss";

interface ColorfulTagProps {
    text: string;
    className: string;
    type: string;
}

const ColorfulTag: React.FC<ColorfulTagProps> = ({ text, className, type }) => {
    return (
        <div>
            <div className={className}>
                <span style={{
                    background: getPokcolor(type)
                }} className="colorful-tag">{text}</span>
            </div>
        </div>
    );
};

export default ColorfulTag;
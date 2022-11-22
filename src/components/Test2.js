import React from 'react';
import pp from './images/pp1.png'
const Test2 = () => {
    return (
        <div>
            <svg width="500" height="350">
                <defs>
                    <clipPath id="myCircle">
                        <circle cx="250" cy="145" r="125" fill="#FFFFFF" />
                    </clipPath>
                </defs>
                <image width="500" height="350" href={pp} clip-path="url(#myCircle)" />

            </svg>
        </div>
    );
};

export default Test2;
import React from 'react';
import './images/pp1.png'
const Testmap = () => {
    return (
        <div>
            <image width="500" height="350" xlinkHref={`./images/pp.png`}/>

            <svg width="500" height="350">
                <defs>
                    <clipPath id="myCircle">
                        <circle cx="250" cy="145" r="125" fill="#FFFFFF" />
                    </clipPath>
                </defs>
                {/*<image width="500" height="350" href={'./images/pp1.png'} clip-path="url(#myCircle)" />*/}
            </svg>
        </div>
    );
};

export default Testmap;
import React, { useState } from 'react';

const Paragraph = ({ title, textAlign, color, width, shortDescription, readjustifytext }) => {
    const [showFull, setShowFull] = useState(false);

    const alignmentClass = textAlign === 'left' ? 'md:text-left text-center'
        : textAlign === 'onyleft' ? 'text-left'
            : textAlign === 'right' ? 'text-right'
                : 'text-center';

    const textColor = color === 'white' ? 'text-white'
        : color === '#00A762' ? 'text-[#00A762] hover:text-[#000000]'
            : 'text-[#000000]';
            
    const readjustify = readjustifytext === 'start' ? 'justify-start' : 'justify-center';

    const titleStyle = {
        width: width,
    };

    const toggleDescription = () => {
        setShowFull(!showFull);
    };

    if (shortDescription === 'true') {
        return (
            <div>
                {showFull ? (
                    <p className={`text-base font-dm ${alignmentClass} ${textColor}`} style={titleStyle}>{title}</p>
                ) : (
                    <p className={`text-base font-dm ${alignmentClass} ${textColor} overflow-hidden line-clamp-3`} style={titleStyle}>{title}</p>
                )}
                <div className={`flex items-center ${readjustify}`} >
                    <button className="text-[#00A762] font-dm mt-2" onClick={toggleDescription}>
                        {showFull ? 'Read Less' : 'Read More'}
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <p className={`text-base font-dm ${alignmentClass} ${textColor}`} style={titleStyle}>{title}</p>
        );
    }
};

export default Paragraph;


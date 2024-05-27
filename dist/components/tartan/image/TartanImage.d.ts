import React from 'react';
interface TartanProps {
    style?: React.CSSProperties;
    id?: string;
    useBlur?: boolean;
    blurValue?: number;
    name: string;
    threadCount: string;
    colourPalette: string;
    imageSize: number;
    noOfSetts: number;
    xOffsetThreadCount: number;
    yOffsetThreadCount: number;
}
declare const TartanSVG: React.FC<TartanProps>;
export default TartanSVG;

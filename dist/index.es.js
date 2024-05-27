import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const Weft = (props) => {
    const { tartan } = props;
    const RederWeft = () => {
        let y = 0;
        const weft = tartan === null || tartan === void 0 ? void 0 : tartan.fullSet.map((thread, idx) => {
            var _a;
            const rect = jsx("rect", { fill: '#' + ((_a = thread.colour) === null || _a === void 0 ? void 0 : _a.hex), width: "100%", height: thread.noOfThreads * tartan.scaledStrokeLength, x: "0", y: y }, 'weft-' + idx);
            y += thread.noOfThreads * tartan.scaledStrokeLength;
            return rect;
        });
        return jsx(Fragment, { children: weft });
    };
    return (jsx("g", { id: "weft", children: jsx(RederWeft, {}) }));
};

const Warp = (props) => {
    const { tartan } = props;
    const RenderWarp = () => {
        let x = 0;
        const warp = tartan === null || tartan === void 0 ? void 0 : tartan.fullSet.map((thread, idx) => {
            var _a;
            const rect = jsx("rect", { fill: '#' + ((_a = thread.colour) === null || _a === void 0 ? void 0 : _a.hex), height: "100%", width: thread.noOfThreads * tartan.scaledStrokeLength, x: x, y: "0" }, 'warp-' + idx);
            x += thread.noOfThreads * tartan.scaledStrokeLength;
            return rect;
        });
        return jsx(Fragment, { children: warp });
    };
    return (jsx("g", { id: "warp", mask: "url(#threadHatchingMask)", children: jsx(RenderWarp, {}) }));
};

const ThreadHatching = (props) => {
    const { tartan } = props;
    const x = (tartan === null ? 2 : tartan.scaledStrokeLength);
    return (jsxs("pattern", { "data-testid": 'pattern', id: "threadHatching", x: "0", y: "0", patternUnits: "userSpaceOnUse", width: x * 2, height: x * 2, children: [jsx("rect", { x: "0", y: -x / 2, height: x, width: x / 2, fill: "white" }), jsx("rect", { x: "0", y: x * 1.5, height: x, width: x / 2, fill: "white" }), jsx("rect", { x: x / 2, y: "0", height: x, width: x / 2, fill: "white" }), jsx("rect", { x: x, y: x / 2, height: x, width: x / 2, fill: "white" }), jsx("rect", { x: x * 1.5, y: x, height: x, width: x / 2, fill: "white" })] }));
};

class Colour {
    constructor(colourCode, hex, name) {
        this.colourCode = colourCode;
        this.hex = hex;
        this.name = name;
    }
}

class ColourPalette {
    constructor(paletteStr) {
        this.paletteStr = paletteStr;
        this.colours = ColourPalette.buildPalette(this.paletteStr);
    }
    getColour(colourCode) {
        return this.colours.get(colourCode);
    }
    static buildPalette(paletteStr) {
        const colourMap = new Map();
        const palette = paletteStr.slice(0, paletteStr.length - 1); // knock off last ":"
        const colors = palette.split(';');
        colors.forEach(color => {
            const equalsIndex = color.indexOf('=');
            const colorCode = color.substring(0, equalsIndex).trim();
            const hex = color.substring(equalsIndex + 1, equalsIndex + 7).trim();
            const name = color.substring(equalsIndex + 7).trim();
            const colour = new Colour(colorCode, hex, name);
            colourMap.set(colour.colourCode, colour);
        });
        return colourMap;
    }
}

class Thread {
    constructor(name, colour, colourCode, noOfThreads, isPivot) {
        this.name = name;
        this.colourCode = colourCode;
        this.noOfThreads = noOfThreads;
        this.isPivot = isPivot;
        this.colour = colour;
    }
}

class TartanEntity {
    constructor(name, threadCount, palette, noOfSetts, imageSize, xOffsetThreadCount, yOffsetThreadCount, useBlur = true, blurValue = 0.5) {
        this.threads = [];
        this.fullSet = [];
        this.colourPalette = null;
        this.isHalfSet = false;
        this.noOfThreads = 0;
        this.scaleFactor = 1;
        this.strokeLength = 2;
        this.scaledStrokeLength = 1;
        this.useBlur = true;
        this.blurValue = 0.5;
        this.buildFullSet = (threads, isHalfSet) => {
            let fSet = [];
            if (isHalfSet) {
                const nextSet = threads.toReversed().slice(1, threads.length - 1);
                fSet = threads.concat(nextSet);
            }
            else {
                fSet = [...threads];
            }
            return fSet;
        };
        this.updateIsHalfSet = () => {
            return this.threads[this.threads.length - 1].isPivot;
        };
        this.updateNumberOfThreads = () => {
            return this.fullSet.reduce((prev, thread) => prev + thread.noOfThreads, 0);
        };
        this.name = name;
        this._threadCount = threadCount;
        this._palette = palette;
        this.noOfSetts = noOfSetts;
        this.imageSize = imageSize;
        this.xOffsetThreadCount = xOffsetThreadCount;
        this.yOffsetThreadCount = yOffsetThreadCount;
        this.useBlur = useBlur;
        this.blurValue = blurValue;
        if (name.length > 0 && threadCount.length > 0 && palette.length > 0) {
            this.colourPalette = new ColourPalette(this._palette);
            this.threads = TartanEntity.extractThreadsFromThreadCount(this._threadCount, this.colourPalette);
            this.isHalfSet = this.updateIsHalfSet();
            this.fullSet = this.buildFullSet(this.threads, this.isHalfSet);
            this.noOfThreads = this.updateNumberOfThreads();
            this.scaleFactor = (this.imageSize / (this.noOfSetts * this.getSetSize()));
            this.scaledStrokeLength = this.scaleFactor * this.strokeLength;
        }
    }
    static addSpaceAfterNumbers(str) {
        return str.replace(/(\d+)/g, '$1 ').replace(/ {2,}/g, ' ').trim();
    }
    getSetSize() {
        return this.strokeLength * this.noOfThreads;
    }
    static extractThreadsFromThreadCount(threadCount, colourPalette) {
        const threadCountItems = [];
        const threadCountTokens = this.addSpaceAfterNumbers(threadCount.toUpperCase()).trim().split(' ');
        threadCountTokens.forEach(threadItem => {
            const newThreadItem = threadItem.replace(/(\d+)/g, (_, num) => {
                return '=' + num;
            });
            const threadParts = newThreadItem.trim().split('=');
            if (threadParts[0].length > 0) {
                let colourCode = threadParts[0];
                const isPivot = colourCode.includes(TartanEntity.halfSettToken);
                colourCode = isPivot ? colourCode.substring(0, colourCode.indexOf('/')) : colourCode;
                const noOfThreads = parseInt(threadParts[1]);
                const colour = colourPalette.getColour(colourCode);
                threadCountItems.push(new Thread('dummy', colour, colourCode, noOfThreads, isPivot));
            }
        });
        return threadCountItems;
    }
    set palette(palette) {
        this._palette = palette;
    }
    get palette() {
        return this._palette;
    }
    set threadCount(val) {
        this._threadCount = val;
    }
    get threadCount() {
        return this._threadCount;
    }
}
TartanEntity.halfSettToken = '/';

const TartanSVG = (props) => {
    const [tartanEntity, setTartanEntity] = useState();
    const { style, id } = props;
    useEffect(() => {
        const { name, threadCount, colourPalette, imageSize, noOfSetts, xOffsetThreadCount, yOffsetThreadCount, useBlur, blurValue } = props;
        setTartanEntity(new TartanEntity(name, threadCount, colourPalette, noOfSetts, imageSize, xOffsetThreadCount, yOffsetThreadCount, useBlur, blurValue));
    }, [props]);
    const filter = ({ useBlur, blurValue }) => {
        if (useBlur) {
            return (jsx("filter", { "data-testid": 'blurFilter', id: "blur", children: jsx("feGaussianBlur", { stdDeviation: blurValue, in: "SourceGraphic", result: "BLUR", edgeMode: 'wrap' }) }));
        }
        return null;
    };
    const setX = (tartanEntity !== undefined ? (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.xOffsetThreadCount) * 2 * (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.scaleFactor) : 0);
    const setY = tartanEntity !== undefined ? (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.yOffsetThreadCount) * 2 * (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.scaleFactor) : 0;
    if (tartanEntity !== undefined) {
        return (jsxs("svg", { "data-testid": 'tartanImage', id: id, height: tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.imageSize, width: tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.imageSize, style: style, xmlns: "http://www.w3.org/2000/svg", children: [filter(tartanEntity), jsxs("defs", { children: [jsx("mask", { id: "threadHatchingMask", x: "0", y: "0", width: "1", height: "1", children: jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: "url(#threadHatching)" }) }), jsx(ThreadHatching, { tartan: tartanEntity }), jsxs("pattern", { "data-testid": 'testSett', id: "sett", x: setX, y: setY, patternUnits: "userSpaceOnUse", width: tartanEntity !== null ? (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.getSetSize()) * (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.scaleFactor) : 0, height: tartanEntity !== null ? (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.getSetSize()) * (tartanEntity === null || tartanEntity === void 0 ? void 0 : tartanEntity.scaleFactor) : 0, children: [jsx(Weft, { tartan: tartanEntity }), jsx(Warp, { tartan: tartanEntity })] })] }), jsx("rect", { "data-testid": 'tartanRect', x: "0", y: "0", height: "100%", width: "100%", fill: "url(#sett)", filter: tartanEntity.useBlur ? 'url(#blur)' : '' })] }));
    }
    else {
        return null;
    }
};

export { TartanSVG as default };
//# sourceMappingURL=index.es.js.map

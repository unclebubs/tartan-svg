import { Colour } from './Colour';
export declare class ColourPalette {
    paletteStr: string;
    colours: Map<string, Colour>;
    constructor(paletteStr: string);
    getColour(colourCode: string): Colour | undefined;
    static buildPalette(paletteStr: string): Map<string, Colour>;
}

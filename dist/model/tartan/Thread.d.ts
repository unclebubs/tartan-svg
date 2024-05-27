import { type Colour } from './Colour';
export declare class Thread {
    name: string;
    colourCode: string;
    noOfThreads: number;
    isPivot: boolean;
    colour: Colour | undefined;
    constructor(name: string, colour: Colour | undefined, colourCode: string, noOfThreads: number, isPivot: boolean);
}

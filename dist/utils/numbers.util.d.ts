type NumberString = {
    [key: number | string]: string;
};
export declare const units: NumberString;
export declare const twentyDefault: NumberString;
export declare const tenSpecial: NumberString;
export declare const tenthDefault: NumberString;
export declare const hundredDefault: NumberString;
export declare function getUnitName(unitNumber: number): string;
export declare function getTenthsString(tenthToConvert: number): string | number;
export declare function concatTenths(tenthDefault: string, unit: number): string | number;
export declare function getHundredsString(hundredToConvert: number): string | number;
export declare function getThousandsString(numberToSegment: number): string | number;
export declare function getMillionString(numberToSegment: number): string | number;
export declare function convertNumberToString(numberToConvert: number, currency?: string): string;
export {};

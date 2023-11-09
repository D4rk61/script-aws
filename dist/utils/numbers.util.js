"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumberToString = exports.getMillionString = exports.getThousandsString = exports.getHundredsString = exports.concatTenths = exports.getTenthsString = exports.getUnitName = exports.hundredDefault = exports.tenthDefault = exports.tenSpecial = exports.twentyDefault = exports.units = void 0;
const segment_util_1 = require("./segment.util");
exports.units = {
    0: '',
    1: 'UN',
    2: 'DOS',
    3: 'TRES',
    4: 'CUATRO',
    5: 'CINCO',
    6: 'SEIS',
    7: 'SIETE',
    8: 'OCHO',
    9: 'NUEVE',
};
exports.twentyDefault = {
    0: 'VEINTE',
};
exports.tenSpecial = {
    0: 'DIEZ',
    1: 'ONCE',
    2: 'DOCE',
    3: 'TRECE',
    4: 'CATORCE',
    5: 'QUINCE',
};
exports.tenthDefault = {
    1: 'DIEZ',
    2: 'VEINTE',
    3: 'TREINTA',
    4: 'CUARENTA',
    5: 'CINCUENTA',
    6: 'SESENTA',
    7: 'SETENTA',
    8: 'OCHENTA',
    9: 'NOVENTA',
};
exports.hundredDefault = {
    0: 'CIEN',
    1: 'CIENTO',
    2: 'DOSCIENTOS',
    3: 'TRESCIENTOS',
    4: 'CUATROCIENTOS',
    5: 'QUINIENTOS',
    6: 'SEISCIENTOS',
    7: 'SETECIENTOS',
    8: 'OCHOCIENTOS',
    9: 'NOVECIENTOS',
};
function getUnitName(unitNumber) {
    return exports.units[unitNumber] ?? '';
}
exports.getUnitName = getUnitName;
function getTenthsString(tenthToConvert) {
    if (tenthToConvert >= 100 || tenthToConvert < 0)
        throw new Error('FUERA DE RANGO');
    const tens = Math.floor(tenthToConvert / 10);
    const unit = tenthToConvert - tens * 10;
    const getSpecialTenth = (ten, unit) => {
        const specialString = ten === 1 ? `DIECI${getUnitName(unit)}` : `VEINTI${getUnitName(unit)}`;
        return ten[unit] || specialString;
    };
    if (tens < 0 || unit < 0)
        throw new Error('FUERA DE RANGO');
    if (tens === 0)
        return getUnitName(unit);
    if (tens === 1)
        return unit <= 5 ? exports.tenSpecial[unit] : getSpecialTenth(tens, unit);
    if (tens === 2)
        return unit === 0 ? exports.twentyDefault[unit] : getSpecialTenth(tens, unit);
    return concatTenths(exports.tenthDefault[tens], unit);
}
exports.getTenthsString = getTenthsString;
function concatTenths(tenthDefault, unit) {
    if (unit > 0)
        return `${tenthDefault} Y ${getUnitName(unit)}`;
    return tenthDefault;
}
exports.concatTenths = concatTenths;
function getHundredsString(hundredToConvert) {
    const hundreds = Math.floor(hundredToConvert / 100);
    const tenths = hundredToConvert - hundreds * 100;
    const validations = {
        isHundred: hundreds === 1 && tenths === 0,
        isAnyHundred: hundreds >= 1 && hundreds <= 9 && tenths == 0,
        isMoreThanAnyHundred: hundreds >= 1 && tenths > 0,
    };
    if (validations.isHundred)
        return exports.hundredDefault[0];
    if (validations.isAnyHundred)
        return exports.hundredDefault[hundreds];
    if (validations.isMoreThanAnyHundred)
        return `${exports.hundredDefault[hundreds]} ${getTenthsString(tenths)}`;
    return getTenthsString(tenths);
}
exports.getHundredsString = getHundredsString;
function getThousandsString(numberToSegment) {
    const divisor = 1000;
    const rest = numberToSegment % divisor;
    const thousandsString = (0, segment_util_1.getSegmentString)({
        numberToSegment,
        divisor,
        singularStringSeparator: 'UN MIL',
        pluralStringSeparator: 'MIL',
    });
    const hundredsString = getHundredsString(rest);
    if (!thousandsString)
        return hundredsString;
    return `${thousandsString} ${hundredsString}`.trim();
}
exports.getThousandsString = getThousandsString;
function getMillionString(numberToSegment) {
    const divisor = 1000000;
    const rest = numberToSegment % divisor;
    const millionsString = (0, segment_util_1.getSegmentString)({
        numberToSegment,
        divisor,
        singularStringSeparator: 'UN MILLON',
        pluralStringSeparator: 'MILLONES',
    });
    const restString = getThousandsString(rest);
    if (!millionsString)
        return restString;
    return `${millionsString} ${restString}`.trim();
}
exports.getMillionString = getMillionString;
function convertNumberToString(numberToConvert, currency = 'USD') {
    if (numberToConvert === 0)
        return `CERO ${currency}`;
    const sign = numberToConvert < 0 ? 'MENOS ' : '';
    const absoluteNumber = Math.abs(numberToConvert);
    const wholePart = Math.floor(absoluteNumber);
    const decimalPart = Math.round((absoluteNumber - wholePart) * 100);
    let words = `${sign}${getMillionString(wholePart)}`;
    if (decimalPart > 0) {
        words += ` CON ${decimalPart}/100`;
    }
    return `${words} ${currency}`;
}
exports.convertNumberToString = convertNumberToString;
//# sourceMappingURL=numbers.util.js.map
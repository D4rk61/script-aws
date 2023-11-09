"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSegmentString = void 0;
const numbers_util_1 = require("./numbers.util");
function getSegmentString({ numberToSegment, divisor, singularStringSeparator, pluralStringSeparator, }) {
    const hundreds = Math.floor(numberToSegment / divisor);
    if (hundreds === 0)
        return '';
    if (hundreds > 1)
        return `${(0, numbers_util_1.getHundredsString)(hundreds)} ${pluralStringSeparator}`;
    else if (hundreds === 1)
        return singularStringSeparator;
}
exports.getSegmentString = getSegmentString;
//# sourceMappingURL=segment.util.js.map
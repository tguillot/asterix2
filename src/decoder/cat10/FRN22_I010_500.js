// Standard Deviation of Position
// Definition:
// Standard Deviation of Position
// Format:
// Four octet fixed length Data Item.

import { int8Toint16 } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "standard_deviation_of_position";
const byteLength = 4;
const factorLSB = 0.25;
export function parse(record) {

    let sigX = record[0] * factorLSB;
    let sigY = record[1] * factorLSB;
    let sigXY = int8Toint16(record[2], record[3]) * factorLSB;

    pushDataItem10(name, {
        sigX: sigX,
        sigY: sigY,
        sigXY: sigXY
    });

    return record.subarray(byteLength);
}





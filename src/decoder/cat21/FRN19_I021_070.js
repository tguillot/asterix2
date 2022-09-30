// Mode 3/A Code in Octal Representation
// Definition:
// Mode-3/A code converted into octal representation.
// Format:
// Two-octet fixed length Data Item.

import { int8Toint16, maskAndShift, mask } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b070";
const byteLength = 2;
export function parse(record) {

    let modeBits = int8Toint16(record[0], record[1]);

    let modeA = maskAndShift(modeBits, 12, 10);
    let modeB = maskAndShift(modeBits, 9, 7);
    let modeC = maskAndShift(modeBits, 6, 4);
    let modeD = maskAndShift(modeBits, 3, 1);

    let mode = modeA * 1000 + modeB * 100 + modeC * 10 + modeD;

    pushDataItem21(name, mode);

    return record.subarray(byteLength);
}




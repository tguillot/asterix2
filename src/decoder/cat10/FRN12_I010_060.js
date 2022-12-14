// Mode-3/A Code in Octal Representation
// Definition:
// Mode-3/A code converted into octal representation.
// Format:
// Two-octet fixed length Data Item.

import { int8Toint16, maskAndShift, mask } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "a060";
const byteLength = 2;
const item = {
    v: ["Code validated", "Code not validated"],
    g: ["Default", "Garbled code"],
    l: ["Mode-3/A from transponder reply", "Mode-3/A code not extracted during the last scan"],
}
export function parse(record) {

    let indexV = maskAndShift(record[0], 8);
    let indexG = maskAndShift(record[0], 7);
    let indexL = maskAndShift(record[0], 6);

    let modeBits = int8Toint16(record[0], record[1]);

    let modeA = maskAndShift(modeBits, 12, 10);
    let modeB = maskAndShift(modeBits, 9, 7);
    let modeC = maskAndShift(modeBits, 6, 4);
    let modeD = maskAndShift(modeBits, 3, 1);

    let mode = modeA * 1000 + modeB * 100 + modeC * 10 + modeD;

    pushDataItem10(name, mode.toString().padStart(4, '0'));

    return record.subarray(byteLength);
}




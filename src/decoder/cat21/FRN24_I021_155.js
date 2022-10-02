// Barometric Vertical Rate
// Definition : Barometric Vertical Rate, in two’s complement form.
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, maskAndShift, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b155";
const byteLength = 2;
const item = ["Value in defined range", "Value exceeds defined range"];
const factorLSB = 6.25;
export function parse(record) {

    let indexRE = maskAndShift(record[0], 8);
    let barometricVerticalRate = maskAndShift(int8Toint16(record[0], record[1]), 15, 1);
    barometricVerticalRate = twosComplementToInt(barometricVerticalRate, 15) * factorLSB;

    pushDataItem21(name,barometricVerticalRate);

    return record.subarray(byteLength);
}
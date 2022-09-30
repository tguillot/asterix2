//Track Angle Rate
// Definition: Rate of Turn, in two’s complement form.
//     Format :
// 2 - Byte Fixed length data item.

import { int8Toint16, maskAndShift, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b165";
const byteLength = 2;
const factorLSB = 1 / 32;
export function parse(record) {

    let trackAngleRate = maskAndShift(int8Toint16(record[0], record[1]), 10, 1);
    trackAngleRate = twosComplementToInt(trackAngleRate, 10) * factorLSB;

    pushDataItem21(name, trackAngleRate);

    return record.subarray(byteLength);
}
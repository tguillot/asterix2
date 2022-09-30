// Air Speed
// Definition : Calculated Air Speed (Element of Air Vector).
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b150";
const byteLength = 2;
const item = ["IAS", "Mach"];
const factorLSB = [2 ** (-14), 0.001];
export function parse(record) {

    let indexIM = maskAndShift(record[0], 8);
    let airSpeed = maskAndShift(int8Toint16(record[0], record[1]), 15, 1) * factorLSB[indexIM];

    pushDataItem21(name,airSpeed);

    return record.subarray(byteLength);
}
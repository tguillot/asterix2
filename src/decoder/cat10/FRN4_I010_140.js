// Time of Day
// Definition:
// Absolute time stamping expressed as UTC.
// Format:
// Three-octet fixed length Data Item.

import { int8Toint24, secondsToString } from "../utils/bitUtils.js";


import { pushDataItem10 } from "../decoder";

const name = "a140";
const name2 = "a140p";

const byteLength = 3;
const factorLSB = 1 / 128;
export function parse(record) {

    let seconds = int8Toint24(record[0], record[1], record[2]) * factorLSB;
    pushDataItem10(name, seconds);
    pushDataItem10(name2, secondsToString(seconds));

    return record.subarray(byteLength);
}




// Time of Day
// Definition:
// Absolute time stamping expressed as UTC.
// Format:
// Three-octet fixed length Data Item.

import { int8Toint24, secondsToString } from "../utils/bitUtils.js";


import { pushDataItem } from "../decoder";

const name = "time_of_day";
const name2 = "time_of_day_pretty";

const byteLength = 3;
const factorLSB = 1 / 128;
export function parse(record) {

    let seconds = int8Toint24(record[0], record[1], record[2]) * factorLSB;
    pushDataItem(name, seconds);
    pushDataItem(name2, secondsToString(seconds));

    return record.subarray(byteLength);
}




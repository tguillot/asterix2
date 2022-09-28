// Time of Day
// Definition:
// Absolute time stamping expressed as UTC.
// Format:
// Three-octet fixed length Data Item.

import { int8Toint24 } from "../utils/bitUtils.js";


import { pushDataItem } from "../decoder";

const name = "time_of_day";
const byteLength = 3;
const factorLSB = 1 / 128;
export function parse(record) {

    pushDataItem(name, int8Toint24(record[0], record[1], record[2]) * factorLSB);

    return record.subarray(byteLength);
}




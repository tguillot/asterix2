// Time of Message Reception for Velocity
// Definition : Time of reception of the latest velocity squitter in the Ground
// Station, in the form of elapsed time since last midnight, expressed
// as UTC.
// Format :
// Three-Octet fixed length data item.

import { int8Toint24, secondsToString } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b075";
const name2 = "b075p";

const byteLength = 3;
const factorLSB = 1 / 128;
export function parse(record) {

    let seconds = int8Toint24(record[0], record[1], record[2]) * factorLSB;
    pushDataItem21(name, seconds);
    pushDataItem21(name2, secondsToString(seconds));

    return record.subarray(byteLength);
}
// True Airspeed
// Definition : True Air Speed.
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b151";
const byteLength = 2;
const item = ["Value in defined range", "Value exceeds defined range"];
export function parse(record) {

    let indexRE = maskAndShift(record[0], 8);
    let TAS = maskAndShift(int8Toint16(record[0], record[1]), 15, 1);

    pushDataItem21(name,TAS);

    return record.subarray(byteLength);
}
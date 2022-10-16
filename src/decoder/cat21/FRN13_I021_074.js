// Time of Message Reception of Position–High Precision
// Definition : Time at which the latest ADS-B position information was received
// by the ground station, expressed as fraction of the second of the
// UTC Time.
// Format :
// Four-Octet fixed length data item.

import { int8Toint32, maskAndShift, secondsToString } from "../utils/bitUtils.js";
import { pushDataItem21 } from "../decoder";

const name = "b074";
const name2 = "b074p";

const byteLength = 4;
const factorLSB = 2 ** (-30);
const item = ["Whole seconds", "Whole seconds + 1", "Whole seconds - 1", "Reserved"]
export function parse(record) {

    let time = int8Toint32(record[0], record[1], record[2], record[3]);
    let indexFSI = maskAndShift(record[0], 8, 7);

    time = maskAndShift(time, 30, 1) * factorLSB;

    pushDataItem21(name, time)

    pushDataItem21(name2,secondsToString(time))

    return record.subarray(byteLength);
}
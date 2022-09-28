// Time of Message Reception of Velocity–High Precision
// Definition : Time at which the latest ADS-B velocity information was received
// by the ground station, expressed as fraction of the second of the
// UTC Time.
// Format :
// Four-Octet fixed length data item.

import { int8Toint32, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "time_of_message_reception_of_velocity-high_precision";
const byteLength = 4;
const factorLSB = 2 ** (-30);
const item = ["Whole seconds", "Whole seconds + 1", "Whole seconds - 1", "Reserved"]
export function parse(record) {

    let time = int8Toint32(record[0], record[1], record[2], record[3]);
    let indexFSI = maskAndShift(record[0], 8, 7);

    time = maskAndShift(time, 30, 1) * factorLSB;

    pushDataItem(name, {
        FSI: item[indexFSI],
        time: time,
    })

    return record.subarray(byteLength);
}
// Pre-programmed Message
// Definition:
// Number related to a pre-programmed message that can be
// transmitted by a vehicle.
// Format:
// One octet fixed length Data Item.

import { maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "pre-programmed_message";
const byteLength = 1;
const item = {
    TRB: ["Default", "In Trouble"],
    MSG: ["Towing aircraft", "“Follow me” operation", "Runway check", "Emergency operation (fire, medical…)",
        "Work in progress (maintenance, birds scarer, sweepers…)"],
}
export function parse(record) {

    let indexTRB = maskAndShift(record[0], 8);
    let indexMSG = maskAndShift(record[0], 7, 1);

    pushDataItem10(name, {
        TRB: item["TRB"][indexTRB],
        MSG: item["MSG"][indexMSG - 1],
    });

    return record.subarray(byteLength);
}




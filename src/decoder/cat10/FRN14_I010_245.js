// Target Identification
// Definition: Target (aircraft or vehicle) identification in 8 characters.
// Format: Seven-octet fixed length Data Item.

import { intArrayToCharsAIS, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "a245";
const byteLength = 7;
const item = {
    STI: ["Callsign/registration downlinked from transponder", "Callsign not downlinked from transponder",
        "Registration not downlinked from transponder"],
    g: ["Default", "Garbled code"],
    l: ["Mode-3/A code from transponder reply", "Mode-3/A code not extracted during the last scan"],
}
let bitsPerChar = 6;
export function parse(record) {

    let indexSTI = maskAndShift(record[0], 8, 7);
    let targetId = intArrayToCharsAIS(record.subarray(1, 7), bitsPerChar)

    pushDataItem10(name, {
        STI: item["STI"][indexSTI],
        targetId: targetId,
    });

    return record.subarray(byteLength);
}




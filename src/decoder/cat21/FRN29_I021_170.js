// Target Identification
// Definition: Target (aircraft or vehicle) identification in 8 characters.
// Format: Seven-octet fixed length Data Item.

import { intArrayToCharsAIS, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b170";
const byteLength = 6;
let bitsPerChar = 6;

export function parse(record) {
    let targetId = intArrayToCharsAIS(record.subarray(0, 6), bitsPerChar)

    pushDataItem21(name, targetId);

    return record.subarray(byteLength);
}




// Target Identification
// Definition: Target (aircraft or vehicle) identification in 8 characters.
// Format: Seven-octet fixed length Data Item.

import { intArrayToCharsAIS, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "target_identification";
const byteLength = 6;
let bitsPerChar = 6;

export function parse(record) {
    let targetId = intArrayToCharsAIS(record.subarray(0, 6), bitsPerChar)

    pushDataItem(name, targetId);

    return record.subarray(byteLength);
}




// Target Address
// Definition: Target address (24-bits address) assigned uniquely to each
// Target.
// Format: Three-octet fixed length Data Item

import { intArrayToCharsHex } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "a220";
const byteLength = 3;
const bitsPerChar = 4;
export function parse(record) {

    let targetAdress = intArrayToCharsHex(record.subarray(0, 3), bitsPerChar);
    pushDataItem10(name, targetAdress);

    return record.subarray(byteLength);
}




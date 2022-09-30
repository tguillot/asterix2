// Track Number
// Definition:
// An integer value representing a unique reference to a track
// record within a particular track file.
// Format:
// Two-octet fixed length Data Item.

import { int8Toint16 } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "track_number";
const byteLength = 2;
export function parse(record) {

    let trackNumber = int8Toint16(record[0], record[1]);

    pushDataItem21(name, trackNumber);


    return record.subarray(byteLength);
} 
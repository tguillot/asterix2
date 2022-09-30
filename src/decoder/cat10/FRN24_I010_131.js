// Amplitude of Primary Plot
// Definition:
// Amplitude of Primary Plot.
// Format:
// One-Octet fixed length Data Item.

import { pushDataItem10 } from "../decoder";

const name = "a131";
const byteLength = 1;
export function parse(record) {

    let PAM = record[0];
    pushDataItem10(name, PAM);

    return record.subarray(byteLength);
}




// Amplitude of Primary Plot
// Definition:
// Amplitude of Primary Plot.
// Format:
// One-Octet fixed length Data Item.

import { pushDataItem10 } from "../decoder";

const name = "amplitude_of_primary_plot";
const byteLength = 1;
export function parse(record) {

    let PAM = record[0];
    pushDataItem10(name, PAM);

    return record.subarray(byteLength);
}




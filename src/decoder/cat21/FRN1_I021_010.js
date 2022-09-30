// Data Source Identifier
// Definition:
// Identification of the system from which the data are received.
// Format:
// Two-octet fixed length Data Item.

import { pushDataItem21 } from "../decoder";

const name1 = "SAC";
const name2 = "SIC";
const byteLength = 2;
export function parse(record) {

    let SAC = record[0];
    let SIC = record[1];

    pushDataItem21(name1, SAC)
    pushDataItem21(name2, SIC)

    return record.subarray(byteLength);
}




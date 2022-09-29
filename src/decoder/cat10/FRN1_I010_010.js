// Data Source Identifier
// Definition:
// Identification of the system from which the data are received.
// Format:
// Two-octet fixed length Data Item.

import { pushDataItem } from "../decoder";

const name1 = "SAC";
const name2 = "SIC";

const byteLength = 2;
export function parse(record) {

    let SAC = record[0];
    let SIC = record[1];

    pushDataItem(name1,SAC)
    pushDataItem(name2,SIC)


    return record.subarray(byteLength);
}




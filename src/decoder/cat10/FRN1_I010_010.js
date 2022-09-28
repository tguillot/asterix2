// Data Source Identifier
// Definition:
// Identification of the system from which the data are received.
// Format:
// Two-octet fixed length Data Item.

import { pushDataItem } from "../decoder";

const name = "data_source_identifier";
const byteLength = 2;
export function parse(record) {

    let SAC = record[0];
    let SIC = record[1];

    pushDataItem(name, {
        SAC: SAC,
        SIC: SIC,
    })

    return record.subarray(byteLength);
}




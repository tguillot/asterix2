//Service Management
// Definition: Identification of services offered by a ground station (identified by a
//     SIC code).
//     Format: One-octet fixed length Data Item.

import { pushDataItem21 } from "../decoder";

const name = "b016";
const byteLength = 1;
const factorLSB = 0.5;
export function parse(record) {

    let reportPeriod = record[0] * factorLSB;

    pushDataItem21(name, reportPeriod);

    return record.subarray(byteLength);
}
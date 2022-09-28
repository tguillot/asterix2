//Service Management
// Definition: Identification of services offered by a ground station (identified by a
//     SIC code).
//     Format: One-octet fixed length Data Item.

import { pushDataItem } from "../decoder";

const name = "service_management";
const byteLength = 1;
const factorLSB = 0.5;
export function parse(record) {

    let reportPeriod = record[0] * factorLSB;

    pushDataItem(name, reportPeriod);

    return record.subarray(byteLength);
}
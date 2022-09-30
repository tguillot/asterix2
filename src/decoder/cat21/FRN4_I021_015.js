//Service Identification
// Definition : Identification of the service provided to one or more users.
// Format : One-Octet fixed length data item.

import { pushDataItem21 } from "../decoder";

const name = "service_identification";
const byteLength = 1;
export function parse(record) {

    let service_id = record[0];

    pushDataItem21(name, service_id);

    return record.subarray(byteLength);
}
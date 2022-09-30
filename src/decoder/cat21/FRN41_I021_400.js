//Receiver ID
// Definition : Designator of Ground Station in Distributed System.
// Format :
// One-octet fixed length Data Item.

import { pushDataItem21 } from "../decoder";

const name = "b400";
const byteLength = 1;
export function parse(record) {

    let receiverID = record[0];

    pushDataItem21(name, receiverID);

    return record.subarray(byteLength);
}
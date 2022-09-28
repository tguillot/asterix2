//Receiver ID
// Definition : Designator of Ground Station in Distributed System.
// Format :
// One-octet fixed length Data Item.

import { pushDataItem } from "../decoder";

const name = "receiver_ID";
const byteLength = 1;
export function parse(record) {

    let receiverID = record[0];

    pushDataItem(name, receiverID);

    return record.subarray(byteLength);
}
// Message Type
// Definition:
// This Data Item allows for a more convenient handling of the
// messages at the receiver side by further defining the type of
// transaction.
// Format:
// One-octet fixed length Data Item.

import { pushDataItem10 } from "../decoder";

const name = "a000";
const byteLength = 1;
const typeNames = ["Target Report", "Start of Update Cycle", "Periodic Status Message", "Event-triggered Status Message"];
export function parse(record) {

    pushDataItem10(name, typeNames[record[0] - 1]);

    return record.subarray(byteLength);
}




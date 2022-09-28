// Time of Message Reception for Position
// Definition : Time of reception of the latest position squitter in the Ground
// Station, in the form of elapsed time since last midnight, expressed
// as UTC.
// Format :
// Three-Octet fixed length data item.

import { int8Toint24 } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "time_of_message_reception_for_position";
const byteLength = 3;
const factorLSB = 1 / 128;
export function parse(record) {

    pushDataItem(name, int8Toint24(record[0], record[1], record[2]) * factorLSB);

    return record.subarray(byteLength);
}
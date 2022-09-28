// Time of Applicability for Velocity
// Definition : Time of applicability (measurement) of the reported velocity, in the
// form of elapsed time since last midnight, expressed as UTC.
// Format :
// Three-Octet fixed length data item.
import { int8Toint24 } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "time_of_applicability_for_velocity";
const byteLength = 3;
const factorLSB = 1 / 128;
export function parse(record) {

    pushDataItem(name, int8Toint24(record[0], record[1], record[2]) * factorLSB);

    return record.subarray(byteLength);
}
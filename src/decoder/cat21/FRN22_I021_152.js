// Magnetic Heading
// Definition : Magnetic Heading (Element of Air Vector).
// Format :
// Two-Octet fixed length data item.

import { int8Toint16 } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "magnetic_heading";
const byteLength = 2;
const factorLSB = 360 / 2 ** 16;
export function parse(record) {

    let magneticHeading = int8Toint16(record[0], record[1]) * factorLSB;

    pushDataItem21(name, magneticHeading);

    return record.subarray(byteLength);
}





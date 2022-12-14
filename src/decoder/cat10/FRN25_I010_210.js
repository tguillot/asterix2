// Calculated Acceleration
// Definition : Calculated Acceleration of the target, in two’s complement form.
// Format :
// Two-Octet fixed length data item.

import { twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "a210";
const byteLength = 2;
const factorLSB = 0.25;
export function parse(record) {

    let ax = twosComplementToInt(record[0], 8) * factorLSB;
    let ay = twosComplementToInt(record[1], 8) * factorLSB;

    pushDataItem10(name, {
        ax: ax,
        ay: ay,
    });

    return record.subarray(byteLength);
}




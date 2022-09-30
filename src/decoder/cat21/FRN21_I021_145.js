// Flight Level
// Definition : Flight Level from barometric measurements, not QNH corrected,
// in two’s complement form.
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, maskAndShift, mask, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b145";
const byteLength = 2;
const factorLSB = 1 / 4;

export function parse(record) {

    let FL = int8Toint16(record[0], record[1]);
    FL = twosComplementToInt(FL, 16) * factorLSB;

    pushDataItem21(name, FL);

    return record.subarray(byteLength);
}




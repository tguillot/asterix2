// Roll Angle
// Definition : The roll angle, in two’s complement form, of an aircraft executing a
// turn.
// Format :
// A two byte fixed length data item.

import { int8Toint16, twosComplementToInt } from "../utils/bitUtils.js";
import { NM_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem21 } from "../decoder";

const name = "b230";
const byteLength = 2;
const factorLSB = 0.01;
export function parse(record) {

    let rollAngle = int8Toint16(record[0], record[1]);
    rollAngle = twosComplementToInt(rollAngle, 16) * factorLSB;

    pushDataItem21(name, rollAngle);

    return record.subarray(byteLength);
}





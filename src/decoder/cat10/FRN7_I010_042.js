// Position in Cartesian Co-ordinates
// Definition:
// Position of a target in Cartesian co-ordinates, in two’s
// complement form.
// Format:
// Four-octet fixed length Data Item .

import { int8Toint16, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "position_in_cartesian_co-ordinates";
const byteLength = 4;
export function parse(record) {

    let x = int8Toint16(record[0], record[1]);
    let y = int8Toint16(record[2], record[3]);
    x = twosComplementToInt(x, 16);
    y = twosComplementToInt(y, 16);

    pushDataItem10(name, {
        x: x,
        y: y,
    });

    return record.subarray(byteLength);
}





// Measured Height
// Definition:
// Height above local 2D co-ordinate reference system (two's
// complement) based on direct measurements not related to
// barometric pressure.
// Format:
// Two-octet fixed length Data Item.

import { int8Toint16, twosComplementToInt } from "../utils/bitUtils.js";
import { ft_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem10 } from "../decoder";

const name = "a091";
const byteLength = 2;
const factorLSB = 6.25;


export function parse(record) {

    let measuredHeight = int8Toint16(record[0], record[1]);
    measuredHeight = twosComplementToInt(measuredHeight, 16) * factorLSB;

    measuredHeight = measuredHeight * ft_to_Meters


    pushDataItem10(name, measuredHeight);

    return record.subarray(byteLength);
}




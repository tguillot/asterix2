// Geometric Height
// Definition : Minimum height from a plane tangent to the earth’s ellipsoid,
// defined by WGS-84, in two’s complement form.
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, mask, twosComplementToInt } from "../utils/bitUtils.js";
import { ft_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem21 } from "../decoder";

const name = "b140";
const byteLength = 2;
const factorLSB = 6.25;
const specialCase = '0111111111111111'
export function parse(record) {

    let measuredHeight = int8Toint16(record[0], record[1]);
    if (measuredHeight == parseInt(specialCase, 2)) {
        measuredHeight = "greater than";
    } else {
        measuredHeight = twosComplementToInt(measuredHeight, 16) * factorLSB;
        measuredHeight = measuredHeight * ft_to_Meters
    }

    pushDataItem21(name, measuredHeight);

    return record.subarray(byteLength);
}




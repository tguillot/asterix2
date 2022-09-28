// Geometric Vertical Rate
// Definition : Geometric Vertical Rate, in two’s complement form.
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, maskAndShift, twosComplementToInt } from "../utils/bitUtils.js";
import { ft_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem } from "../decoder";

const name = "geometric_vertical_rate";
const byteLength = 2;
const item = ["Value in defined range", "Value exceeds defined range"];
const factorLSB = 6.25 * ft_to_Meters / 60;
export function parse(record) {

    let indexRE = maskAndShift(record[0], 8);
    let geometricVerticalRate = maskAndShift(int8Toint16(record[0], record[1]), 15, 1);
    geometricVerticalRate = twosComplementToInt(geometricVerticalRate, 15) * factorLSB;

    pushDataItem(name,
        {
            RE: item[indexRE],
            geometricVerticalRate: geometricVerticalRate,

        });

    return record.subarray(byteLength);
}
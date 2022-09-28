// Airborne Ground Vector
// Definition : Ground Speed and Track Angle elements of Airborne Ground
// Vector.
// Format :
// Four-Octet fixed length data item.

import { int8Toint16, maskAndShift, twosComplementToInt } from "../utils/bitUtils.js";
import { NM_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem } from "../decoder";

const name = "airborne_ground_vector";
const byteLength = 4;
const item = ["Value in defined range", "Value exceeds defined range"];
const factorLSBSpeed = 2 ** -14;
const factorLSBAngle = 360 / 2 ** 16;
export function parse(record) {

    let indexRE = maskAndShift(record[0], 8);

    let groundSpeed = maskAndShift(int8Toint16(record[0], record[1]), 15, 1) * factorLSBSpeed;
    let trackAngle = int8Toint16(record[2], record[3]) * factorLSBAngle;

    groundSpeed = groundSpeed * NM_to_Meters;

    pushDataItem(name, {
        RE: item[indexRE],
        groundSpeed: groundSpeed,
        trackAngle: trackAngle,
    });

    return record.subarray(byteLength);
}





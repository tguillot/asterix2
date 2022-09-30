// Calculated Track Velocity in Polar Co-ordinates
// Definition:
// Calculated track velocity expressed in polar co-ordinates.
// Format :
// Four-Octet fixed length data item.

import { int8Toint16, twosComplementToInt } from "../utils/bitUtils.js";
import { NM_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem10 } from "../decoder";

const name = "a200";
const byteLength = 4;
const factorLSBSpeed = 2 ** -14;
const factorLSBAngle = 360 / 2 ** 16;
export function parse(record) {

    let groundSpeed = int8Toint16(record[0], record[1]) * factorLSBSpeed;
    let trackAngle = int8Toint16(record[2], record[3]) * factorLSBAngle;

    groundSpeed = groundSpeed * NM_to_Meters;

    pushDataItem10(name, {
        groundSpeed: groundSpeed,
        trackAngle: trackAngle,
    });

    return record.subarray(byteLength);
}





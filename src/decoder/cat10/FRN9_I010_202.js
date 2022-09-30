// Calculated Track Velocity in Cartesian Co-ordinates
// Definition:
// Calculated track velocity expressed in Cartesian co-
// ordinates, in two’s complement representation.
// Format:
// Four-octet fixed length Data Item .

import { int8Toint16, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "calculated_track_velocity_in_cartesian_co-ordinates";
const byteLength = 4;
const factorLSB = 0.25;
export function parse(record) {

    let vx = twosComplementToInt(int8Toint16(record[0], record[1]), 16) * factorLSB;
    let vy = twosComplementToInt(int8Toint16(record[2], record[3]), 16) * factorLSB;

    pushDataItem10(name, {
        vx: vx,
        vy: vy,
    });

    return record.subarray(byteLength);
}





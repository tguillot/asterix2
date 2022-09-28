// Measured Position in Polar Co-ordinates
// Definition:
// Measured position of a target in local polar co-ordinates.
// Format:
// Four-octet fixed length Data Item.

import { int8Toint16, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "measured_position_in_polar_co-ordinates";
const byteLength = 4;
const factorLSBTheta = 360 / 2 ** 16;
export function parse(record) {

    let rho = int8Toint16(record[0], record[1]);
    let theta = int8Toint16(record[2], record[3]) * factorLSBTheta;

    pushDataItem(name, {
        rho: rho,
        theta: theta,
    });

    return record.subarray(byteLength);
}





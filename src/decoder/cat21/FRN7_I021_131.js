// High-Resolution Position in WGS-84 Co-ordinates
// Definition : Position in WGS-84 Co-ordinates in high resolution.
// Format :
// Eight-octet fixed length Data Item.

import { int8Toint32, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "high-resolution_position_in_WGS-84_co-ordinates";
const byteLength = 8;
const factorLSB = 180 / 2 ** 30;
export function parse(record) {

    let lat = int8Toint32(record[0], record[1], record[2], record[3]);
    let lon = int8Toint32(record[4], record[5], record[6], record[7]);

    lat = twosComplementToInt(lat, 32) * factorLSB;
    lon = twosComplementToInt(lon, 32) * factorLSB;


    pushDataItem(name, {
        lat: lat,
        lon: lon,
    });

    return record.subarray(byteLength);
}
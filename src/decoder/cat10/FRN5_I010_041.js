// Position in WGS-84 Co-ordinates
// Definition :
// Position of a target in WGS-84 Co-ordinates.
// Format :
// Eight-octet fixed length Data Item

import { int8Toint32, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "a041";
const byteLength = 8;
const factorLSB = 180 / 2 ** 31;
export function parse(record) {

    let lat = int8Toint32(record[0], record[1], record[2], record[3]);
    let lon = int8Toint32(record[4], record[5], record[6], record[7]);

    lat = twosComplementToInt(lat, 32) * factorLSB;
    lon = twosComplementToInt(lon, 32) * factorLSB;


    pushDataItem10(name, {
        lat: lat,
        lon: lon,
    });

    return record.subarray(byteLength);
}





// Position in WGS-84 Co-ordinates
// Definition :
// Position of a target in WGS-84 Co-ordinates.
// Format :
// Eight-octet fixed length Data Item

import { int8Toint24, int8Toint32, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "position_in_WGS-84_co-ordinates";
const byteLength = 6;
const factorLSB = 180 / 2 ** 23;
export function parse(record) {

    let lat = int8Toint24(record[0], record[1], record[2]);
    let lon = int8Toint24(record[3], record[4], record[5]);

    lat = twosComplementToInt(lat, 24) * factorLSB;
    lon = twosComplementToInt(lon, 24) * factorLSB;


    pushDataItem(name, {
        lat: lat,
        lon: lon,
    });

    return record.subarray(byteLength);
}





//Message Amplitude
// Definition : Amplitude, in dBm, of ADS-B messages received by the ground
// station, coded in two’s complement.
// Format :
// One-Octet fixed length data item.

import { twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "message_amplitude";
const byteLength = 1;
export function parse(record) {

    let MAM = record[0];
    MAM = twosComplementToInt(MAM, 8);
    pushDataItem(name, MAM);
    return record.subarray(byteLength);

}
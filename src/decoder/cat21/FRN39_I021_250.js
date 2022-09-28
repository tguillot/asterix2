// Mode S MB Data
// Definition: Mode S Comm B data as extracted from the aircraft
// transponder.
// Format: Repetitive Data Item starting with a one-octet Field Repetition
// Indicator (REP) followed by at least one BDS report comprising
// one seven octet BDS register and one octet BDS code.

import { maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "mode_S_MB_data";
let byteLength = 0;
const multiple = 8;

export function parse(record) {

    let rep = record[0];
    byteLength = 1 + rep * multiple;

    let BDSArray = [];
    for (let i = 0; i < rep; i++) {
        let BDS1 = maskAndShift(record[8 + i * multiple], 8, 5);
        let BDS2 = maskAndShift(record[8 + i * multiple], 4, 1);
        let BDS = {
            BDS1: BDS1,
            BDS2: BDS2
        };
        BDSArray.push(BDS);
    }

    pushDataItem(name, BDSArray);
    return record.subarray(byteLength);
}

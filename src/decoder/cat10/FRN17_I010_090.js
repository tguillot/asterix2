// Flight Level in Binary Representation
// Definition:
// Flight Level (Mode C / Mode S Altitude) converted into binary
// two's complement representation.
// Format:
// Two-octet fixed length Data Item.

import { int8Toint16, maskAndShift, mask } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "flight_level_in_binary_representation";
const byteLength = 2;
const factorLSB = 1 / 4;
const item = {
    v: ["Code validated", "Code not validated"],
    g: ["Default", "Garbled code"]
};

export function parse(record) {

    let indexV = maskAndShift(record[0], 8);
    let indexG = maskAndShift(record[0], 7);
    let FL = maskAndShift(int8Toint16(record[0], record[1]), 14, 1) * factorLSB;

    pushDataItem10(name, {
        v: item["v"][indexV],
        g: item["g"][indexG],
        FL: FL
    });

    return record.subarray(byteLength);
}




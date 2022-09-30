// System Status
// Definition: Information concerning the configuration and status of a
// System.
// Format: One-octet fixed length Data Item.

import { maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "a550";
const byteLength = 1;
const item = {
    NOGO: ["Operational", "Degraded", "NOGO"],
    OVL: ["No overload", "Overload"],
    TSV: ["valid", "invalid"],
    DIV: ["Normal Operation", "Diversity degraded"],
    TTF: ["Test Target Operative", "Test Target Failure"],
}
export function parse(record) {

    let indexNOGO = maskAndShift(record[0], 8, 7);
    let indexOVL = maskAndShift(record[0], 6);
    let indexTSV = maskAndShift(record[0], 5);
    let indexDIV = maskAndShift(record[0], 4);
    let indexTTF = maskAndShift(record[0], 3);

    pushDataItem10(name, {
        NOGO: item["NOGO"][indexNOGO],
        OVL: item["OVL"][indexOVL],
        TSV: item["TSV"][indexTSV],
        DIV: item["DIV"][indexDIV],
        TTF: item["TTF"][indexTTF],
    });

    return record.subarray(byteLength);
}




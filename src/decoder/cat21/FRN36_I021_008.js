// Aircraft Operational Status
// Definition: Identification of the operational services available in the aircraft while
// airborne.
//         Format: One - octet fixed length Data Item.

import { maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b008";
const byteLength = 1;
const item = {
    RA: ["TCAS II or ACAS RA not active", "TCAS RA active"],
    TC: ["no capability for Trajectory Change Reports",
        "support for TC+0 reports only", "Runway check",
        "support for multiple TC reports",
        "reserved"],
    TS: ["no capability to support Target State Reports", "capable of supporting target State Reports"],
    ARV: ["no capability to generate ARV-reports", "capable of generate ARV-reports"],
    CDTIA: ["CDTI not operational", "CDTI operational"],
    notTCAS: ["TCAS operational", "TCAS not operational"],
    SA: ["Antenna Diversity", "Single Antenna only"],
}
export function parse(record) {

    let indexRA = maskAndShift(record[0], 8);
    let indexTC = maskAndShift(record[0], 7, 6);
    let indexTS = maskAndShift(record[0], 5);
    let indexARV = maskAndShift(record[0], 4);
    let indexCDTIA = maskAndShift(record[0], 3);
    let indexTCAS = maskAndShift(record[0], 2);
    let indexSA = maskAndShift(record[0], 1);





    pushDataItem21(name, {
        RA: item.RA[indexRA],
        TC: item.TC[indexTC],
        TS: item.TS[indexTS],
        ARV: item.ARV[indexARV],
        CDTIA: item.CDTIA[indexCDTIA],
        notTCAS: item.notTCAS[indexTCAS],
        SA: item.SA[indexSA],
    });

    return record.subarray(byteLength);
}




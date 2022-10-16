// Quality Indicators
// Definition : ADS-B quality indicators transmitted by a/c according to MOPS
// version.
// Format :
// Variable Length Data Item, comprising a primary subfield of one-
// octet, followed by one-octet extensions as necessary.

import { getNumBytesWithFX, maskAndShift } from "../utils/bitUtils.js";
//TODO: ask for TODO


import { pushDataItem21 } from "../decoder";

const name = "b090";
let byteLength = 0;


export function parse(record) {

    byteLength = getNumBytesWithFX(record)

    let velocityUncertainty= maskAndShift(record[0], 8, 6);
    let positionUncertainty = maskAndShift(record[0], 5,2);

    let firstPart = {
        NACorNUCvel: velocityUncertainty,
        NACorNUCpos: positionUncertainty,
    };

    let extendedParts = extend(byteLength, record)
    let dataItem = { ...firstPart, ...extendedParts };

    pushDataItem21(name,  dataItem);

    return record.subarray(byteLength);
}

function extend(byteLength, record) {

    let extendedParts = {};

    if (byteLength > 1) {
        let NICBARO = maskAndShift(record[1], 8);
        let SIL = maskAndShift(record[1], 7,6);
        let NACpos = maskAndShift(record[1], 5,2);


        let firstExtension = {
            NIC_BARO: NICBARO,
            SIL: SIL,
            NACpos:NACpos
        };
        extendedParts = { ...extendedParts, ...firstExtension };
    }
    if (byteLength > 2) {
        let SIL = maskAndShift(record[2], 6);
        let SDA = maskAndShift(record[2], 5,4);
        let GVA = maskAndShift(record[2], 3,2);


        let secondExtension = {
            SIL: SIL,
            SDA: SDA,
            GVA: GVA,

        };
        extendedParts = { ...extendedParts, ...secondExtension };
    }
    if (byteLength > 3) {
        let PIC = maskAndShift(record[2], 8,5);



        let thirdExtension = {
            PIC: PIC,


        };
        extendedParts = { ...extendedParts, ...thirdExtension };
    }

    return extendedParts;

}


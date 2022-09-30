// Met Information
// Definition : Meteorological information.
// Format :
// Compound data item consisting of a one byte primary sub-field,
// followed by up to four fixed length data fields.

import { getNumBytesWithFX, int8Toint16, maskAndShift, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "met_information";
let byteLength = 0;
const factorLSB = 0.25;
export function parse(record) {

    let dataItem = {};
    byteLength += 1; //record[0]

    if (maskAndShift(record[0], 8)) { //WS
        dataItem.windSpeed = int8Toint16(record[1], record[2])
        byteLength += 2;
    }

    if (maskAndShift(record[0], 7)) { //WD
        dataItem.windDirection = int8Toint16(record[byteLength], record[byteLength + 1])
        byteLength += 2;
    }

    if (maskAndShift(record[0], 6)) { //TMP
        dataItem.temperature = twosComplementToInt(int8Toint16(record[byteLength], record[byteLength + 1]), 16) * factorLSB
        byteLength += 2;
    }

    if (maskAndShift(record[0], 5)) { //TRB
        dataItem.turbulence = record[byteLength]
        byteLength += 1;
    }


    pushDataItem21(name, dataItem);

    return record.subarray(byteLength);
}

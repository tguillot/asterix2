//  Data Ages
// Definition : Ages of the data provided.
// Format : Compound Data Item, comprising a primary subfield of up to five
// octets, followed by the indicated subfields

import { getNumBytesWithFX, int8Toint32, intArrayToBits, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b295";
let byteLength = 0;
const keys = ["AOS", "TRD", "M3A", "QI", "TI", "MAM", "GH", "FL", "ISA", "FSA", "AS", "TAS",
    "MH", "BVR", "GVR", "GV", "TAR", "TI", "TS", "MET", "ROA", "ARA", "SCC"];

const factorLSB = 0.1;
export function parse(record) {

    byteLength = getNumBytesWithFX(record)

    let dataItem = {};

    let FSPEC = record.subarray(0, byteLength);
    let strFSPEC = intArrayToBits(FSPEC).replace(/(.{7})./g, "$1");

    for (let i = 0; i < strFSPEC.length; i++) {
        if (strFSPEC.charAt(i) == "1" & i < 23) {
            dataItem[keys[i]] = parseInt(record[byteLength]) * factorLSB;
            byteLength++;
        }
    }


    pushDataItem21(name, dataItem);

    return record.subarray(byteLength);
}
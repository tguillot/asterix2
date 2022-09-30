// Target Report Descriptor
// Definition:
// Type and characteristics of the data as transmitted by a
// system.
// Format:
// Variable length Data Item comprising a first part of one-octet,
// followed by one-octet extents as necessary.

import { pushDataItem10 } from "../decoder.js";
import { getNumBytesWithFX, maskAndShift } from "../utils/bitUtils.js";

const name = "target_report_descriptor";
let byteLength = 0;
const item = {
    TYP: ["SSR multilateration", "Mode S multilateration", "ADS-B", "PSR", "Magnetic Loop System", "HF multilateration", "Not defined", "Other types"],
    DCR: ["No differential correction (ADS-B)", "Differential correction (ADS-B)"],
    CHN: ["Chain 1", "Chain 2"],
    GBS: ["Transponder Ground bit not set", "Transponder Ground bit set"],
    CRT: ["No Corrupted reply in multilateration", "No Corrupted reply in multilateration"],
    SIM: ["Actual target report", "Simulated target report"],
    TST: ["Default", "Test Target"],
    RAB: ["Report from target transponder", "Report from fixed transponder"],
    LOP: ["Undetermined", "Loop start", "Loop finish"],
    TOT: ["Undetermined", "Aircraft", "Ground vehicle", "Helicopter"],
    SPI: ["End of Data Item", "Extension into next extent"],
}

export function parse(record) {

    byteLength = getNumBytesWithFX(record)

    let indexTYP = maskAndShift(record[0], 8, 6);
    let indexDCR = maskAndShift(record[0], 5);
    let indexCHN = maskAndShift(record[0], 4);
    let indexGBS = maskAndShift(record[0], 3);
    let indexCRT = maskAndShift(record[0], 2);

    let firstPart = {
        TYP: item["TYP"][indexTYP],
        DCR: item["DCR"][indexDCR],
        CHN: item["CHN"][indexCHN],
        GBS: item["GBS"][indexGBS],
        CRT: item["CRT"][indexCRT],
    };

    let extendedParts = extend(byteLength, record)
    let dataItem = { ...firstPart, ...extendedParts };

    pushDataItem10(name, dataItem);

    return record.subarray(byteLength);
}

function extend(byteLength, record) {

    let extendedParts = {};

    if (byteLength > 1) {
        let indexSIM = maskAndShift(record[1], 8);
        let indexTST = maskAndShift(record[1], 7);
        let indexRAB = maskAndShift(record[1], 6);
        let indexLOP = maskAndShift(record[1], 5, 4);
        let indexTOT = maskAndShift(record[1], 3, 2);

        let firstExtension = {
            SIM: item["SIM"][indexSIM],
            TST: item["TST"][indexTST],
            RAB: item["RAB"][indexRAB],
            LOP: item["LOP"][indexLOP],
            TOT: item["TOT"][indexTOT],
        };
        extendedParts = { ...extendedParts, ...firstExtension };
    }
    if (byteLength > 2) {
        let indexSPI = maskAndShift(record[2], 8);

        let secondExtension = {
            SPI: item["SPI"][indexSPI],
        };
        extendedParts = { ...extendedParts, ...secondExtension };
    }

    return extendedParts;

}


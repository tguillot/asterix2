// Target Report Descriptor
// Definition:
// Type and characteristics of the data as transmitted by a
// system.
// Format:
// Variable length Data Item comprising a first part of one-octet,
// followed by one-octet extents as necessary.

import { getNumBytesWithFX, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "target_report_descriptor";
let byteLength = 0;
const item = {
    ATP: ["24-Bit ICAO address", "Duplicate address", "Surface vehicle address", "Anonymous address", "Reserved", "Reserved", "Reserved", "Reserved"],
    ARC: ["25 ft", "100 ft", "Unknown", "Invalid"],
    RC: ["Default", "Range Check passed, CPR Validation pending"],
    RAB: ["Report from target transponder", "Report from field monitor (fixed transponder)"],

    DCR: ["No differential correction (ADS-B)", "Differential correction (ADS-B)"],
    GBS: ["Transponder Ground bit not set", "Transponder Ground bit set"],
    SIM: ["Actual target report", "Simulated target report"],
    TST: ["Default", "Test Target"],
    SAA: ["Equipment capable to provide Selected Altitude", "Equipment not capable to provide Selected Altitude"],
    CL: ["Report valid", "Report suspect", "No information", "Reserved for future use"],

    IPC: ["default", "Independent Position Check failed"],
    NOGO: ["NOGO-bit not set", "NOGO-bit set"],
    CPR: ["CPR Validation correct", "CPR Validation failed"],
    LDPJ: ["LDPJ not detected", "LDPJ detected"],
    RCF: ["default", "Range Check failed"]

}

export function parse(record) {

    byteLength = getNumBytesWithFX(record)

    let indexATP = maskAndShift(record[0], 8, 6);
    let indexARC = maskAndShift(record[0], 5, 4);
    let indexRC = maskAndShift(record[0], 3);
    let indexRAB = maskAndShift(record[0], 2);

    let firstPart = {
        ATP: item["ATP"][indexATP],
        ARC: item["ARC"][indexARC],
        RC: item["RC"][indexRC],
        RAB: item["RAB"][indexRAB],
    };

    let extendedParts = extend(byteLength, record)
    let dataItem = { ...firstPart, ...extendedParts };

    pushDataItem(name, dataItem);

    return record.subarray(byteLength);
}

function extend(byteLength, record) {

    let extendedParts = {};

    if (byteLength > 1) {
        let indexDCR = maskAndShift(record[1], 8);
        let indexGBS = maskAndShift(record[1], 7);
        let indexSIM = maskAndShift(record[1], 6);
        let indexTST = maskAndShift(record[1], 5);
        let indexSAA = maskAndShift(record[1], 4);
        let indexCL = maskAndShift(record[1], 3, 2);

        let firstExtension = {
            DCR: item["DCR"][indexDCR],
            GBS: item["GBS"][indexGBS],
            SIM: item["SIM"][indexSIM],
            TST: item["TST"][indexTST],
            SAA: item["SAA"][indexSAA],
            CL: item["CL"][indexCL],
        };
        extendedParts = { ...extendedParts, ...firstExtension };
    }
    if (byteLength > 2) {
        let indexIPC = maskAndShift(record[2], 6);
        let indexNOGO = maskAndShift(record[2], 5);
        let indexCPR = maskAndShift(record[2], 4);
        let indexLDPJ = maskAndShift(record[2], 3);
        let indexRCF = maskAndShift(record[2], 2);


        let secondExtension = {
            IPC: item["IPC"][indexIPC],
            NOGO: item["NOGO"][indexNOGO],
            CPR: item["CPR"][indexCPR],
            LDPJ: item["LDPJ"][indexLDPJ],
            RCF: item["RCF"][indexRCF],

        };
        extendedParts = { ...extendedParts, ...secondExtension };
    }

    return extendedParts;

}


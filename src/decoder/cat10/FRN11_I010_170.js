// Track Status
// Definition:
// Status of track.
// Format:
// Variable length Data Item comprising a first part of one-octet,
// followed by one-octet extents as necessary.

import { getNumBytesWithFX, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem10 } from "../decoder";

const name = "a170";
let byteLength = 0;
const item = {
    CNF: ["Confirmed track", "Track in init phase"],
    TRE: ["Default", "Last report for a track"],
    CST: ["No extrapolation", "Predictable extrapolation", "Predictable extrapolation in masked area", "Extrapolation due to no detection"],
    MAH: ["Default", "Horizontal manoeuvre"],
    TCC: ["Tracking performed in 'Sensor Plane'",
        "Slant range correction and projection technique"],
    STH: ["Measured position", "Smoothed position"],
    TOM: ["Unknown type of movement", "Taking-off", "Landing", "Other types of movement"],
    DOU: ["No doubt", "Doubtful correlation", "Doubtful correlation in clutter", "Loss of accuracy",
        "Loss of accuracy in clutter", "Unstable track", "Previously coasted"],
    MRS: ["Merge or split indication undetermined", "Track merged by association to plot",
        "Track merged by non-association to plot", "Split track"],
    GHO: ["Default", "Extension into next extent"],
}

export function parse(record) {

    byteLength = getNumBytesWithFX(record)

    let indexCNF = maskAndShift(record[0], 8);
    let indexTRE = maskAndShift(record[0], 7);
    let indexCST = maskAndShift(record[0], 6, 5);
    let indexMAH = maskAndShift(record[0], 4);
    let indexTCC = maskAndShift(record[0], 3);
    let indexSTH = maskAndShift(record[0], 2);

    let firstPart = {
        CNF: item["CNF"][indexCNF],
        TRE: item["TRE"][indexTRE],
        CST: item["CST"][indexCST],
        MAH: item["MAH"][indexMAH],
        TCC: item["TCC"][indexTCC],
        STH: item["STH"][indexSTH],

    };

    let extendedParts = extend(byteLength, record)
    let dataItem = { ...firstPart, ...extendedParts };

    pushDataItem10(name, dataItem);

    return record.subarray(byteLength);
}

function extend(byteLength, record) {

    let extendedParts = {};

    if (byteLength > 1) {
        let indexTOM = maskAndShift(record[1], 8, 7);
        let indexDOU = maskAndShift(record[1], 6, 4);
        let indexMRS = maskAndShift(record[1], 3, 2);

        let firstExtension = {
            TOM: item["TOM"][indexTOM],
            DOU: item["DOU"][indexDOU],
            MRS: item["MRS"][indexMRS],

        };
        extendedParts = { ...extendedParts, ...firstExtension };
    }
    if (byteLength > 2) {
        let indexGHO = maskAndShift(record[2], 8);

        let secondExtension = {
            GHO: item["GHO"][indexGHO],
        };
        extendedParts = { ...extendedParts, ...secondExtension };
    }

    return extendedParts;

}


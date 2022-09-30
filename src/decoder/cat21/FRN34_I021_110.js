// Trajectory Intent
// Definition : Reports indicating the 4D intended trajectory of the aircraft.
// Format :
// Compound Data Item, comprising a primary subfield of one octet,
// followed by the indicated subfields.

import { intArrayToCharsAIS, maskAndShift } from "../utils/bitUtils.js";
import { ft_to_Meters, NM_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem21 } from "../decoder";

const name = "b110";
let byteLength = 0;
const multiple = 15;
const item = {
    //First Extension
    NAV: ["Trajectory Intent Data is available for this aircraft", "Trajectory Intent Data is not available for this aircraft"],
    NVB: ["Trajectory Intent Data is valid", "Trajectory Intent Data is not valid"],

    //Second Extension
    TCA: ["TCP number available", "TCP number not available"],
    NC: ["TCP compliance", "TCP non-compliance"],
    pointType: ["Unknown", "Fly by waypoint (LT)", "Fly over waypoint (LT)", "Hold pattern (LT)", "Procedure hold (LT)",
        "Procedure turn (LT)", "RF leg (LT)", "Top of climb (VT)", "Top of descent (VT)", "Start of level (VT)",
        "Cross-over altitude (VT)", "Transition altitude (VT)"],
    TD: ["N-A", "Turn right", "Turn left", "No turn"],
    TRA: ["TTR not available", "TTR available"],
    TOA: ["TOV available", "TOV not available"],
};
const factorLSBaltitude = 10 * ft_to_Meters;
const factorLSBcoor = 180 / 2 ** 23;
const factorLSBTTR = 0.01 * NM_to_Meters;

export function parse(record) {

    let dataItem = {};
    byteLength += 1; //record[0]

    if (maskAndShift(record[0], 8)) {
        dataItem.NAV = item.NAV[maskAndShift(record[1], 8)];
        dataItem.NVB = item.NVB[maskAndShift(record[1], 7)];
        byteLength += 1;
    }

    if (maskAndShift(record[0], 7)) {
        let rep = record[byteLength];
        byteLength++; //Byte 1

        let pointArray = [];
        for (let i = 0; i < rep; i++) {
            let point = {};
            let j = byteLength + i * multiple;
            //Byte 2
            point.TCA = item.TCA[maskAndShift(record[j], 8)];
            point.NC = item.NC[maskAndShift(record[j], 7)];
            point.TCP = maskAndShift(record[j], 6, 1);

            //Byte 3 and 4
            let altitude = int8Toint16(record[j + 1], record[j + 2]);
            point.altitude = twosComplementToInt(altitude, 16) * factorLSBaltitude;

            //Byte 5-10
            let lat = int8Toint24(record[j + 3], record[j + 4], record[j + 5]);
            let lon = int8Toint24(record[j + 6], record[j + 7], record[j + 8]);
            point.lat = twosComplementToInt(lat, 24) * factorLSBcoor;
            point.lon = twosComplementToInt(lon, 24) * factorLSBcoor;


            //Byte 11
            point.pointType = item.pointType[maskAndShift(record[j + 9], 8, 5)];
            point.TD = item.TD[maskAndShift(record[j + 9], 4, 3)];
            point.TRA = item.TRA[maskAndShift(record[j + 9], 2)];
            point.TOA = item.TOA[maskAndShift(record[j + 9], 1)];

            //Byte 12-14
            point.TOV = int8Toint24(record[j + 10], record[j + 11], record[j + 12]);

            //Byte 12-14
            point.TTR = int8Toint16(record[j + 13], record[j + 14]) * factorLSBTTR;

            pointArray.push(point);
        }

        byteLength += rep * multiple

        dataItem.pointArray = pointArray;
    }

    pushDataItem21(name, dataItem);

    return record.subarray(byteLength);
}




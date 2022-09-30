//Final State Selected Altitude
// Definition : The vertical intent value that corresponds with the ATC cleared
// altitude, as derived from the Altitude Control Panel (MCP/FCU).
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, maskAndShift, twosComplementToInt } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "final_state_selected_altitude";
const byteLength = 2;
const factorLSB = 25;
const item = ["Not active or unknown", "Active"];
export function parse(record) {

    let indexMV = maskAndShift(record[0], 8)
    let indexAH = maskAndShift(record[0], 7)
    let indexAM = maskAndShift(record[0], 6)

    let altitude = maskAndShift(int8Toint16(record[0], record[1]), 13, 1);
    altitude = twosComplementToInt(altitude, 13) * factorLSB;

    pushDataItem21(name, {
        MV: item[indexMV],
        AH: item[indexAH],
        AM: item[indexAM],
        altitude: altitude
    });

    return record.subarray(byteLength);
}
//Selected Altitude
// Definition : The Selected Altitude as provided by the avionics and
// corresponding either to the MCP/FCU Selected Altitude (the ATC
// cleared altitude entered by the flight crew into the avionics) or to
// the FMS Selected Altitude.
// Format :
// Two-Octet fixed length data item.

import { int8Toint16, maskAndShift, twosComplementToInt } from "../utils/bitUtils.js";
import { ft_to_Meters } from "../utils/unitsUtil.js";

import { pushDataItem21 } from "../decoder";

const name = "b146";
const byteLength = 2;
const factorLSB = 25;
const item = {
    SAS: ["No source information provided", "Source Information provided"],
    source: ["Unknown", "Aircraft Altitude (Holding Altitude)", "MCP/FCU Selected Altitude", "FMS Selected Altitude"]
}
export function parse(record) {


    let indexSAS = maskAndShift(record[0], 8)
    let indexSource = maskAndShift(record[0], 7, 6)

    let altitude = maskAndShift(int8Toint16(record[0], record[1]), 13, 1);
    altitude = twosComplementToInt(altitude, 13) * factorLSB * ft_to_Meters;

    pushDataItem21(name, {
        SAS: item.SAS[indexSAS],
        source: item.source[indexSource],
        altitude: altitude
    });

    return record.subarray(byteLength);
}
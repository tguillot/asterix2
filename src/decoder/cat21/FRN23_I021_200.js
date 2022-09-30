// Target Status
// Definition: Status of the target
// Format:
// One - octet fixed length Data Item

import { maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem21 } from "../decoder";

const name = "b200";
const byteLength = 1;
const item = {
    ICF: ["No intent change active", "Intent change flag raised"],
    LNAV: ["LNAV Mode engaged", "LNAV Mode not engaged"],
    PS: ["No emergency or reported", "General emergency", "Lifeguard/medical emergency", "Minimum fuel", "No communications",
        "Unlawful interference", "Downed Aircraft"],
    SS: ["No condition reported", "Permanent Alert",
        "Temporary Alert", "SPI set"],
}
export function parse(record) {

    let indexICF = maskAndShift(record[0], 8);
    let indexLNAV = maskAndShift(record[0], 7);
    let indexPS = maskAndShift(record[0], 5, 3);
    let indexSS = maskAndShift(record[0], 2, 1);

    pushDataItem21(name, {
        ICF: item["ICF"][indexICF],
        LNAV: item["LNAV"][indexLNAV],
        PS: item["PS"][indexPS],
        SS: item["SS"][indexSS],
    });

    return record.subarray(byteLength);
}




// MOPS Version
// Definition : Identification of the MOPS version used by a/c to supply ADS-B
// information.
// Format : One-octet fixed length Data Item

import { int8Toint16, maskAndShift, mask } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "MOPS_version";
const byteLength = 1;
const item = {
    VNS: ["The MOPS Version is supported by the GS", "The MOPS Version is not supported by the GS"],
    VN: ["ED102/DO-260", "DO-260A", "ED102A/DO-260B"],
    LTT: ["Other", "UAT", "1090 ES", "VDL 4", "Not assigned", "Not assigned", "Not assigned", "Not assigned"],
}
export function parse(record) {

    let indexVNS = maskAndShift(record[0], 7);
    let indexVN = maskAndShift(record[0], 6, 4);
    let indexLTT = maskAndShift(record[0], 3, 1);

    pushDataItem(name, {
        VNS: item["VNS"][indexVNS],
        VN: item["VN"][indexVN],
        LTT: item["LTT"][indexLTT],
    });

    return record.subarray(byteLength);
}




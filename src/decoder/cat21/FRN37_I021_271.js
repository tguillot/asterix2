//  Surface Capabilities and Characteristics
// Definition : Operational capabilities of the aircraft while on the ground.
// Format : Variable Length Data Item, comprising a primary subfield of one-octet,
// followed by an one-octet extensions if necessary. 

import { getNumBytesWithFX, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "surface_capabilities_and_characteristics";
let byteLength = 0;
const item = {
    POA: ["Position transmitted is not ADS-B position reference point", "Position transmitted is ADS-B position reference point"],
    CTIS: ["CDTI not operationa", "CDTI operationa"],
    B2low: ["≥ 70 Watts", "< 70 Watts"],
    RAS: ["Aircraft not receiving ATC-services", "Aircraft receiving ATC-services"],
    IDENT: ["IDENT switch not active", "IDENT switch active"],
    weightAndLength: [
        "L<15 and W<11.5",
        "L<15 and W<23",
        "L<25 and W<28.5",
        "L<25 and W<34",
        "L<35 and W<33",
        "L<35 and W<38",
        "L<45 and W<39.5",
        "L<45 and W<45",
        "L<55 and W<52",
        "L<55 and W<59.5",
        "L<65 and W<67",
        "L<65 and W<72.5",
        "L<75 and W<80",
        "L<75 and W<80",
        "L<85 and W<80",
        "L<85 and W>80",
    ],
}
//TODO: ask what to do with the 2nd version of this data item
export function parse(record) {

    byteLength = getNumBytesWithFX(record)

    let firstPart = {
        POA: item["POA"][maskAndShift(record[0], 6)],
        CTIS: item["CTIS"][maskAndShift(record[0], 5)],
        B2low: item["B2low"][maskAndShift(record[0], 4)],
        RAS: item["RAS"][maskAndShift(record[0], 3)],
        IDENT: item["IDENT"][maskAndShift(record[0], 2)],
    };

    let extendedParts = extend(byteLength, record)
    let dataItem = { ...firstPart, ...extendedParts };

    pushDataItem(name, dataItem);

    return record.subarray(byteLength);
}

function extend(byteLength, record) {
    if (byteLength > 1) {
        return {
            weightAndLength: item["weightAndLength"][maskAndShift(record[1], 4, 1)],
        };
    }
    return {};
}


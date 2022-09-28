// Target Size & Orientation
// Definition:
// Target size defined as length and width of the detected
// target, and orientation.
// Format:
// Variable length Data Item comprising a first part of one octet,
// followed by one-octet extents as necessary.

import { getNumBytesWithFX, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "target_size_&_orientation";
let byteLength = 0;
const factorLSBOrientation = 360 / 128;

export function parse(record) {

    byteLength = getNumBytesWithFX(record)

    let firstPart = {
        length: maskAndShift(record[0], 8, 2),
    };

    let extendedParts = extend(byteLength, record)
    let dataItem = { ...firstPart, ...extendedParts };

    pushDataItem(name, dataItem);

    return record.subarray(byteLength);
}

function extend(byteLength, record) {

    let extendedParts = {};

    if (byteLength > 1) {
        let firstExtension = {
            orientation: maskAndShift(record[1], 8, 2) * factorLSBOrientation,
        };
        extendedParts = { ...extendedParts, ...firstExtension };
    }
    if (byteLength > 2) {
        let secondExtension = {
            width: maskAndShift(record[2], 8, 2),
        };
        extendedParts = { ...extendedParts, ...secondExtension };
    }

    return extendedParts;

}

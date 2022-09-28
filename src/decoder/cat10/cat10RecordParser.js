
import { getNumBytesWithFX, intArrayToBits } from "../utils/bitUtils.js"
import { parse as parse1 } from "./FRN1_I010_010.js"
import { parse as parse2 } from "./FRN2_I010_000.js"
import { parse as parse3 } from "./FRN3_I010_020.js"
import { parse as parse4 } from "./FRN4_I010_140.js"
import { parse as parse5 } from "./FRN5_I010_041.js"
import { parse as parse6 } from "./FRN6_I010_040.js"
import { parse as parse7 } from "./FRN7_I010_042.js"
import { parse as parse8 } from "./FRN8_I010_200.js"
import { parse as parse9 } from "./FRN9_I010_202.js"
import { parse as parse10 } from "./FRN10_I010_161.js"
import { parse as parse11 } from "./FRN11_I010_170.js"
import { parse as parse12 } from "./FRN12_I010_060.js"
import { parse as parse13 } from "./FRN13_I010_220.js"
import { parse as parse14 } from "./FRN14_I010_245.js"
import { parse as parse15 } from "./FRN15_I010_250.js"
import { parse as parse16 } from "./FRN16_I010_300.js"
import { parse as parse17 } from "./FRN17_I010_090.js"
import { parse as parse18 } from "./FRN18_I010_091.js"
import { parse as parse19 } from "./FRN19_I010_270.js"
import { parse as parse20 } from "./FRN20_I010_550.js"
import { parse as parse21 } from "./FRN21_I010_310.js"
import { parse as parse22 } from "./FRN22_I010_500.js"
import { parse as parse23 } from "./FRN23_I010_280.js"
import { parse as parse24 } from "./FRN24_I010_131.js"
import { parse as parse25 } from "./FRN25_I010_210.js"
var parsers = [parse1, parse2, parse3, parse4, parse5, parse6, parse7, parse8, parse9, parse10,
    parse11, parse12, parse13, parse14, parse15, parse16, parse17, parse18, parse19, parse20,
    parse21, parse22, parse23, parse24, parse25];
export function parse(record) {

    let lengthFSPEC = getNumBytesWithFX(record);
    let FSPEC = record.subarray(0, lengthFSPEC);
    let strFSPEC = intArrayToBits(FSPEC).replace(/(.{7})./g, "$1");
    record = record.subarray(lengthFSPEC);

    for (var i = 0; i < strFSPEC.length; i++) {
        if (strFSPEC.charAt(i) == "1" & i < 25) {
            record = parsers[i](record);
        }
    }
}

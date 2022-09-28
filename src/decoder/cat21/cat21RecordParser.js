import { parse as parse1 } from "./FRN1_I021_010.js"
import { parse as parse2 } from "./FRN2_I021_040.js"
import { parse as parse3 } from "./FRN3_I021_161.js"
import { parse as parse4 } from "./FRN4_I021_015.js"
import { parse as parse5 } from "./FRN5_I021_071.js"
import { parse as parse6 } from "./FRN6_I021_130.js"
import { parse as parse7 } from "./FRN7_I021_131.js"
import { parse as parse8 } from "./FRN8_I021_072.js"
import { parse as parse9 } from "./FRN9_I021_150.js"
import { parse as parse10 } from "./FRN10_I021_151.js"
import { parse as parse11 } from "./FRN11_I021_080.js"
import { parse as parse12 } from "./FRN12_I021_073.js"
import { parse as parse13 } from "./FRN13_I021_074.js"
import { parse as parse14 } from "./FRN14_I021_075.js"
import { parse as parse15 } from "./FRN15_I021_076.js"
import { parse as parse16 } from "./FRN16_I021_140.js"
import { parse as parse17 } from "./FRN17_I021_090.js"
import { parse as parse18 } from "./FRN18_I021_210.js"
import { parse as parse19 } from "./FRN19_I021_070.js"
import { parse as parse20 } from "./FRN20_I021_230.js"
import { parse as parse21 } from "./FRN21_I021_145.js"
import { parse as parse22 } from "./FRN22_I021_152.js"
import { parse as parse23 } from "./FRN23_I021_200.js"
import { parse as parse24 } from "./FRN24_I021_155.js"
import { parse as parse25 } from "./FRN25_I021_157.js"
import { parse as parse26 } from "./FRN26_I021_160.js"
import { parse as parse27 } from "./FRN27_I021_165.js"
import { parse as parse28 } from "./FRN28_I021_077.js"
import { parse as parse29 } from "./FRN29_I021_170.js"
import { parse as parse30 } from "./FRN30_I021_020.js"
import { parse as parse31 } from "./FRN31_I021_220.js"
import { parse as parse32 } from "./FRN32_I021_146.js"
import { parse as parse33 } from "./FRN33_I021_148.js"
import { parse as parse34 } from "./FRN34_I021_110.js"
import { parse as parse35 } from "./FRN35_I021_016.js"
import { parse as parse36 } from "./FRN36_I021_008.js"
import { parse as parse37 } from "./FRN37_I021_271.js"
import { parse as parse38 } from "./FRN38_I021_132.js"
import { parse as parse39 } from "./FRN39_I021_250.js"
import { parse as parse40 } from "./FRN40_I021_260.js"
import { parse as parse41 } from "./FRN41_I021_400.js"
import { parse as parse42 } from "./FRN42_I021_295.js"
import { getNumBytesWithFX, intArrayToBits } from "../utils/bitUtils.js"

var parsers = [parse1, parse2, parse3, parse4, parse5, parse6, parse7, parse8, parse9, parse10,
    parse11, parse12, parse13, parse14, parse15, parse16, parse17, parse18, parse19, parse20,
    parse21, parse22, parse23, parse24, parse25, parse26, parse27, parse28, parse29, parse30,
    parse31, parse32, parse33, parse34, parse35, parse36, parse37, parse38, parse39, parse40,
    parse41, parse42];
export function parse(record) {

    let lengthFSPEC = getNumBytesWithFX(record);
    let FSPEC = record.subarray(0, lengthFSPEC);
    let strFSPEC = intArrayToBits(FSPEC).replace(/(.{7})./g, "$1");
    record = record.subarray(lengthFSPEC);

    for (var i = 0; i < strFSPEC.length; i++) {
        if (strFSPEC.charAt(i) == "1" & i < 42) {
            record = parsers[i](record);
        }
    }
}


//AUTOGENERATE
// import { writeFile } from 'fs';

// let code = ["010", "040", "161", "015", "071", "130", "131", "072", "150",
//     "151", "080", "073", "074", "075", "076", "140", "090", "210",
//     "070", "230", "145", "152", "200", "155", "157", "160", "165",
//     "077", "170", "020", "220", "146", "148", "110", "016", "008",
//     "271", "132", "250", "260", "400", "295"]
// for (let i = 0; i < 42; i++) {
//     let filename = "FRN" + (i + 1) + "_I021_" + code[i] + ".js";
//     writeFile(filename, " ", function (err, result) {
//         if (err) console.log('error', err);
//     });
//     // console.log(filename)
// }
// for (let i = 0; i < 42; i++) {
//     let filename = "FRN" + (i + 1) + "_I021_" + code[i] + ".js";
//     let importName = "import { parse as parse" + (i + 1) + " } from " + '"./' + filename + '"';
//     console.log(importName)
// }



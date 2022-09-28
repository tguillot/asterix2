//1 byte has 8-1;
export function getNumBytesWithFX(intArray) {
    let bytes = 1;
    while (intArray[bytes - 1] & 1) {//1 for mask 0b00000001
        bytes++;
    }
    return bytes;
}

export function mask(init, final = init) {
    init--;
    final--;
    let bitsString = '1'.repeat(init - final + 1);//str '111'
    return parseInt(bitsString, 2) << final;//'111'->7->224(0b11100000)
}

export function reverseBits(bits) {
    return bits.split('').reverse().join('')
}

export const intArrayToBits = (ints) =>
    ints.reduce((str, n) => str + intToBits(n), '');

export function intToBits(n) {
    return n.toString(2).padStart(8, '0');
}

export function bitsToInt(bits) {
    return parseInt(bits, 2);
}
function getBit(position, bits) {
    return bits & (1 << position) ? 1 : 0;
}

export function int8Toint16(a, b) {
    return (a << 8) + b;
}
export function int8Toint24(a, b, c) {
    return (a << 16) + (b << 8) + c;
}

export function int8Toint32(a, b, c, d) {
    return (a << 24) + (b << 16) + (c << 8) + d;
}

export function maskAndShift(byte, init, final = init) {
    return (byte & mask(init, final)) >>> (final - 1);
}

export function twosComplementToInt(twosComplement, numberBits = 8) {
    if (twosComplement <= Math.pow(2, numberBits - 1) - 1)
        return twosComplement;
    return -(((~twosComplement) & ((1 << numberBits) - 1)) + 1);
}


export function intArrayToCharsHex(intArray, bitsPerChar) {
    let bitsStr = intArrayToBits(intArray);
    let regexPattern = ".{" + bitsPerChar + "}";
    bitsStr = bitsStr.replace(new RegExp(regexPattern, 'g'), '$& ').split(' ');
    bitsStr.pop();
    return bitsStr.map(elem => parseInt(elem, 2).toString(16).toUpperCase()).join("");
}

const AIS_6BIT = ["@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "[", "\\", "]", "^", "_", "", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?"];


export function intArrayToCharsAIS(intArray) {
    let bitsStr = intArrayToBits(intArray);
    bitsStr = bitsStr.replace(/.{6}/g, '$& ').split(' ');
    bitsStr.pop();
    return bitsStr.map(elem => AIS_6BIT[parseInt(elem, 2)]).join("");
}


export function integerToBytes(bytes, integer) {
    bytes[0] = (integer & 0xff000000) >> 24;
    bytes[1] = (integer & 0x00ff0000) >> 16;
    bytes[2] = (integer & 0x0000ff00) >> 8;
    bytes[3] = integer & 0x000000ff;
    return bytes;
}

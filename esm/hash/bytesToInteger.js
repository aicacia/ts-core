export function bytesToInteger(bytes) {
    return bytes[3] | (bytes[2] << 8) | (bytes[1] << 16) | (bytes[0] << 24);
}

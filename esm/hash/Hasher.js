import { integerToBytes } from "./integerToBytes";
const BYTE_ARRAY = new Uint8Array(1), INTEGER_ARRAY = new Uint8Array(4);
export class Hasher {
    writeByte(byte) {
        BYTE_ARRAY[0] = byte;
        return this.write(BYTE_ARRAY);
    }
    writeInteger(integer) {
        return this.write(integerToBytes(INTEGER_ARRAY, integer));
    }
}

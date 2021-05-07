export declare abstract class Hasher {
    abstract finish(): number;
    abstract write<B extends Uint8Array | number[] = Uint8Array | number[]>(bytes: B): this;
    writeByte(byte: number): this;
    writeInteger(integer: number): this;
}

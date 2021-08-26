import { Hasher } from "./Hasher";
import { smi } from "./smi";
export class FastHasher extends Hasher {
    constructor() {
        super(...arguments);
        this.hash = 0;
    }
    finish() {
        return this.hash;
    }
    write(bytes) {
        let hash = this.hash;
        for (let i = 0, il = bytes.length; i < il; i++) {
            hash = 31 * hash + bytes[i];
        }
        this.hash = smi(hash);
        return this;
    }
}

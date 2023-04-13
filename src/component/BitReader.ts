
export class BitReader {
  private buffer: Uint8Array;
  private bitOffset: number;

  constructor(buffer: Uint8Array) {
    this.buffer = buffer;
    this.bitOffset = 0;
  }

  private _readBit(): number {
    const byteOffset = this.bitOffset >> 3;
    const bitOffset = this.bitOffset & 7;
    const bit = (this.buffer[byteOffset] >> (7 - bitOffset)) & 1;
    this.bitOffset++;
    return bit;
  }

  private _readByte(): number {
    const byteOffset = this.bitOffset >> 3;
    const byte = this.buffer[byteOffset];
    this.bitOffset += 8;
    return byte;
  }

  readString(length: number): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += String.fromCharCode(this._readByte());
    }
    return result;
  }

  readBuffer(length: number): Uint8Array {
    const byteOffset = this.bitOffset >> 3;
    const subBuffer = this.buffer.subarray(byteOffset, byteOffset + length);
    this.bitOffset += 8 * length;
    return subBuffer;
  }

  readBytesLE(length: number): number {
    let result = 0;
    for (let i = 0; i < length; i++) {
      result |= this._readByte() << (i * 8);
    }
    return result;
  }

  resetOffset(bitOffset: number) {
    this.bitOffset = bitOffset;
  }

  private FloorLog2(x: number) {
    let s = 0;
    while (x != 0) {
      x = x >> 1;
      s++;
    }
    return s - 1;
  }

  f(length: number): number {
    return this.u(length);
  }

  u(length: number): number {
    let result = 0;
    for (let i = 0; i < length; i++) {
      result = (result << 1) | this._readBit();
    }
    return result;
  }

  uvlc(): number {
    let leadingZeros = -1;
    for (let done = 0; !done; leadingZeros++) {
      done = this._readBit();
    }
    if (leadingZeros >= 32) {
      return (1 << 32) - 1;
    }
    let value = this.f(leadingZeros);
    return value + (1 << leadingZeros) - 1;
  }

  le(n: number): number {
    let t = 0;
    for (let i = 0; i < n; i++) {
      let byte = this.f(8);
      t += (byte << (i * 8));
    }
    return t;
  }

  leb128(): number {
    let value = 0;
    let byte = 0;
    let shift = 0;
    do {
      byte = this._readByte();
      value |= (byte & 0x7f) << shift;
      shift += 7;
    } while (byte & 0x80);
    return value;
  }

  su(n: number): number {
    let value = this.f(n);
    let signMask = 1 << (n - 1);
    if (value & signMask)
      value = value - 2 * signMask;
    return value;
  }

  ns(n: number): number {
    let w = this.FloorLog2(n) + 1;
    let m = (1 << w) - n;
    let v = this.f(w - 1);
    if (v < m)
      return v;
    let extra_bit = this.f(1);
    return (v << 1) - m + extra_bit;
  }

  L(n: number): number {
    return 0;
  }

  S(): number {
    return 0;
  }

  NS(n: number) {
    let w = this.FloorLog2(n) + 1;
    let m = (1 << w) - n;
    let v = this.L(w - 1);
    if (v < m)
      return v;
    let extra_bit = this.L(1);
    return (v << 1) - m + extra_bit;
  }

  get_position(): number {
    return this.bitOffset;
  }

  byte_alignment() {
    while (this.get_position() & 7)
      this.f(1);
  }
}



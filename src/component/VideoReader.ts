import { BitReader } from "./BitReader";
import { OBU } from './OUB';

interface IVFHeader {
  magic: string;
  version: number;
  header_size: number;
  fourcc: string;
  width: number;
  height: number;
  framerate_numerator: number;
  framerate_denominator: number;
  num_frames: number;
  reserved: number;
};

export class IVF {
  header: IVFHeader;


  constructor() {
    this.header = {} as IVFHeader;
  }

  parse(buffer: Uint8Array) {
    let b = new BitReader(buffer);
    let pkg: any[] = [];

    let h: any = {};
    h['@offset'] = 0;
    h.magic = b.readString(4);
    h.version = b.readBytesLE(2);
    h.header_size = b.readBytesLE(2);
    h.fourcc = b.readString(4);
    h.width = b.readBytesLE(2);
    h.height = b.readBytesLE(2);
    h.framerate_numerator = b.readBytesLE(4);
    h.framerate_denominator = b.readBytesLE(4);
    h.num_frames = b.readBytesLE(4);
    h.reserved = b.readBytesLE(4);
    h['@length'] = 32;
    pkg.push(h);

    let obu = new OBU();
    for (let i = 0; i < h.num_frames; i++) {
      let f: any = {};
      f['@offset'] = b.get_position() / 8;
      f.frame_size = b.readBytesLE(4);
      f.timestamp = b.readBytesLE(8);
      f['@length'] = 12 + f.frame_size;
      f.obu = obu.parse(b.readBuffer(f.frame_size));
      pkg.push(f);
    }
    return pkg;
  }
}

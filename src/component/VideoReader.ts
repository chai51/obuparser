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

export function parser(buffer: Uint8Array) {
  let b = new BitReader(buffer);

  if (b.readString(4) == "DKIF") {
    let ivf = new IVF();
    return ivf.parse(buffer);
  }

  let mp4 = new MP4();
  return mp4.parse(buffer, 0);
}

export class IVF {
  header: IVFHeader;

  constructor() {
    this.header = {} as IVFHeader;
  }

  parse(buffer: Uint8Array) {
    let b = new BitReader(buffer);
    let ivf: any[] = [];

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
    h['@type'] = 'IVF Header';
    ivf.push(h);

    let obu = new OBU();
    for (let i = 0; i < h.num_frames; i++) {
      let f: any = {};
      f['@offset'] = b.get_position() / 8;
      f.frame_size = b.readBytesLE(4);
      f.timestamp = b.readBytesLE(8);
      f['@length'] = 12 + f.frame_size;
      f['@type'] = 'IVF Frame';
      f.obu = obu.parse(b.readBuffer(f.frame_size));
      ivf.push(f);
    }
    return ivf;
  }
}

export class MP4 {
  types: string[];

  constructor() {
    this.types = ["moov", "trak", "edts", "mdia", "minf", "dinf", "stbl"];
  }

  parse(buffer: Uint8Array, offset: number) {
    let b = new BitReader(buffer);
    let box: any[] = [];

    while (buffer.length > b.get_position() / 8) {
      let h: any = {};

      let startBitPos = b.get_position();
      h.size = b.u(32);
      h.type = b.readString(4);
      if (h.size == 1) {
        h.size = b.u(64);
      }

      if (this.types.find((type) => h.type == type)) {
        let currentBitPos = b.get_position();
        let buf = b.readBuffer(h.size - 8);
        h.box = this.parse(buf, offset + currentBitPos / 8);
      } else if (h.type == "ftyp") {
        h.major_brand = b.readString(4);
        h.minor_version = b.u(32);
        h.compatible_brands = b.readString(4);
      }

      h['@offset'] = startBitPos / 8 + offset;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.push(h);
      if (h.size == 0) {
        break;
      } else {
        b.seek(startBitPos + h.size * 8);
      }
    }
    return box;
  }
}
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

export function parser(buffer: Uint8Array, name: string) {
  let b = new BitReader(buffer);

  const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
  if (ext == ".ivf") {
    let ivf = new IVF();
    return ivf.parse(buffer);
  } else if (ext == ".webm") {
    let webm = new WEBM();
    return webm.parse(buffer, 0);
  } else if (ext == ".mp4") {
    let mp4 = new MP4();
    return mp4.parse(buffer, 0);
  }
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
      f.obu = obu.parse(b.readBuffer(f.frame_size), f['@offset'] + 12);
      ivf.push(f);
    }
    return ivf;
  }
}

export class WEBM {
  constructor() {
  }

  headerParse(b: BitReader, h: any) {
    // 找到EBML头的第一个字节
    const kMaxScanBytes = 1024;
    const kEbmlByte0 = 0x1a;
    while (b.get_position() / 8 < kMaxScanBytes) {
      let byte = b.u(8);
      if (byte == kEbmlByte0) {
        // h['@offset'] = (b.get_position() - 8) / 8;
        // h['byte'] = byte;
        break;
      }
    }
    b.seek(0);

    h['@offset'] = b.get_position() / 8;
    h['id'] = this.ReadID(b);
    h['@length'] = this.ReadUInt(b);
    h['@type'] = "EMBL";
    let endBitPos = h['@length'] * 8 + b.get_position();
    h.header = [];
    while (b.get_position() < endBitPos) {
      let header: any = {};
      this.ParseElementHeader(b, header);
      h.header.push(header);
    }
  }

  ReadID(b: BitReader) {
    let temp_byte = b.u(8);
    if (temp_byte == 0) {
      throw Error("读取第一个字节失败");
    }

    let bit_pos = 0;
    const kMaxIdLengthInBytes = 4;
    const kCheckByte = 0x80;
    let found_bit = false;
    for (; bit_pos < kMaxIdLengthInBytes; ++bit_pos) {
      if ((kCheckByte >> bit_pos) & temp_byte) {
        found_bit = true;
        break;
      }
    }
    if (!found_bit) {
      throw Error("The value is too large to be a valid ID");
    }

    const id_length = bit_pos + 1;
    let ebml_id = temp_byte;
    for (let i = 1; i < id_length; ++i) {
      ebml_id <<= 8;
      temp_byte = b.u(8);

      ebml_id |= temp_byte;
    }
    return ebml_id;
  }

  ReadUInt(b: BitReader) {
    let byte = b.u(8);
    let len = 1;
    let m = 0x80;
    while (!(byte & m)) {
      m >>= 1;
      ++len;
    }
    let result = byte & (~m);
    if (len != 1) {
      let l = len - 1;
      let v = b.u(l * 8);
      result = (result << (l * 8)) | v;
    }
    return result;
  }

  ParseElementHeader(b: BitReader, h: any) {
    h['@offset'] = b.get_position() / 8;
    h['id'] = this.ReadID(b);
    h['@length'] = this.ReadUInt(b);

    let value: number | string;
    if (h['id'] == 0x4282) {
      value = b.readString(h['@length']);
    } else {
      value = b.u(h['@length'] * 8);
    }
  }

  parse(buffer: Uint8Array, offset: number) {
    let ebml: any[] = [];
    let b = new BitReader(buffer);

    let h: any = {};
    this.headerParse(b, h);
    ebml.push(h);

    // Segment
    let segment: any = {};
    segment['@offset'] = b.get_position() / 8;
    segment['id'] = this.ReadID(b);
    segment['@length'] = this.ReadUInt(b);
    segment.header = [];
    if (segment['id'] == 0x18538067) {
      let endBitPos = b.get_position() + segment['@length'] * 8;
      while (b.get_position() < endBitPos) {
        let header: any = {};
        this.ParseElementHeader(b, header);
        segment.header.push(header);
      }
    }
    ebml.push(segment);
    return ebml;
  }
}

export class MP4 {
  mdatData: any;
  av1Box: any;

  constructor() {
  }

  parse(buffer: Uint8Array, offset: number) {
    let b = new BitReader(buffer);
    let box: any[] = [];

    while (buffer.length > b.get_position() / 8) {
      let h: any = {};

      let startBitPos = b.get_position();
      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;

      if (h.type == "ftyp") {
        this.fytp(b, h, h.size - headerLen);
      } else if (h.type == "moov") {
        this.moov(b, h, h.size - headerLen);
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
    this.mdat(b, box);

    return box;
  }

  header(b: BitReader, h: any) {
    h.size = b.u(32);
    h.type = b.readString(4);
    if (h.type == "uuid") {
      h.uuid = b.readString(16);
    }
    if (h.size == 1) {
      h.size = b.u(64);
    }
  }

  fullHeader(b: BitReader, h: any) {
    h.version = b.u(8);
    h.flags = b.u(24);
  }

  fytp(b: BitReader, h: any, length: number) {
    h.major_brand = b.readString(4);
    h.minor_version = b.u(32);
    let compatible_brands: string[] = [];
    length -= 8;
    while (length >= 4) {
      compatible_brands.push(b.readString(4));
      length -= 4;
    }
    h.compatible_brands = compatible_brands.join(",");
  }

  moov(b: BitReader, box: any, length: number) {
    box.box = [];
    let bitPos = b.get_position();
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;
      if (h.type == "trak") {
        this.trak(b, h, h.size - headerLen);
      } else if (h.type == "udta") {
        this.udta(b, h, h.size - headerLen);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
  }

  trak(b: BitReader, box: any, length: number) {
    box.box = [];
    let bitPos = b.get_position();
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;

      if (h.type == "tkhd") {
        this.tkhd(b, h, h.size - headerLen);
        if (h.volume) {
          box['@kind'] = "audio";
        } else {
          box['@kind'] = "video";
        }
      } else if (h.type == "mdia") {
        this.mdia(b, h, h.size - headerLen);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
  }

  tkhd(b: BitReader, h: any, length: number) {
    this.fullHeader(b, h);
    if (h.version == 1) {
      h.creation_time = b.u(64);
      h.modification_time = b.u(64);
      h.track_id = b.u(32);
      b.u(32);
      h.duration = b.u(64);
    } else {
      h.creation_time = b.u(32);
      h.modification_time = b.u(32);
      h.track_id = b.u(32);
      b.u(32);
      h.duration = b.u(32);
    }
    b.readBuffer(8);
    h.layer = b.u(16);
    h.alternate_group = b.u(16);
    h.volume = b.u(16) >> 8;
    b.u(16);
    h.matrix = [b.u(32), b.u(32), b.u(32), b.u(32), b.u(32), b.u(32), b.u(32), b.u(32), b.u(32)];
    h.width = b.u(32);
    h.height = b.u(32);
  }

  udta(b: BitReader, box: any, length: number) {
    box.box = [];
    let bitPos = b.get_position();
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;
      if (h.type == "meta") {
        this.meta(b, h, h.size - headerLen);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
  }

  meta(b: BitReader, box: any, length: number) {
    let bitPos = b.get_position();
    box.box = [];
    this.fullHeader(b, box);
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;
      if (h.type == "ilst") {
        this.ilst(b, h, h.size - headerLen);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
  }

  ilst(b: BitReader, box: any, length: number) {

  }

  mdia(b: BitReader, box: any, length: number) {
    box.box = [];
    let bitPos = b.get_position();
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;
      if (h.type == "mdhd") {
        this.mdhd(b, h, h.size - headerLen);
      } else if (h.type == "hdlr") {
        this.hdlr(b, h, h.size - headerLen);
      } else if (h.type == "minf") {
        this.minf(b, h, h.size - headerLen);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
  }

  mdhd(b: BitReader, h: any, length: number) {
    this.fullHeader(b, h);
    if (h.version == 1) {
      h.creation_time = b.u(64);
      h.modification_time = b.u(64);
      h.timescale = b.u(32);
      h.duration = b.u(64);
    } else {
      h.creation_time = b.u(32);
      h.modification_time = b.u(32);
      h.timescale = b.u(32);
      h.duration = b.u(32);
    }

    b.u(1);
    let chars = [];
    chars[0] = b.u(5);
    chars[1] = b.u(5);
    chars[2] = b.u(5);
    h.languageString = String.fromCharCode(chars[0] + 0x60, chars[1] + 0x60, chars[2] + 0x60);
  }

  hdlr(b: BitReader, h: any, length: number) {
    this.fullHeader(b, h);
    if (h.version === 0) {
      b.u(32);
      h.handler = b.readString(4);
      b.readBuffer(12);
      h.name = b.readString(length - 28);
      if (h.name[h.name.length - 1] === '\0') {
        h.name = h.name.slice(0, -1);
      }
    }
  }

  minf(b: BitReader, box: any, length: number) {
    box.box = [];
    let bitPos = b.get_position();
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;

      if (h.type == "stbl") {
        this.stbl(b, h, h.size - headerLen);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
  }

  stbl(b: BitReader, box: any, length: number) {
    let av1 = false;
    box.box = [];
    let bitPos = b.get_position();
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;

      if (h.type == "stsd") {
        av1 = this.stsd(b, h, h.size - headerLen);
      } else if (h.type == "stts") {
        this.stts(b, h);
      } else if (h.type == "stss") {
        this.stss(b, h);
      } else if (h.type == "stsc") {
        this.stsc(b, h);
      } else if (h.type == "stsz") {
        this.stsz(b, h);
      } else if (h.type == "stco") {
        this.stco(b, h);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
    if (av1) {
      this.av1Box = box;
    }
  }

  stsd(b: BitReader, box: any, length: number) {
    let av1 = false;
    this.fullHeader(b, box);
    box.box = [];
    box.entryCount = b.u(32);
    for (let i = 0; i < box.entryCount; i++) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      let headerLen = (b.get_position() - startBitPos) / 8;

      if (h.type == "av01") {
        b.readBuffer(6);
        h.data_reference_index = b.u(16);
        b.u(16);
        b.u(16);
        b.readBuffer(12);
        h.width = b.u(16);
        h.height = b.u(16);
        h.horizresolution = b.u(32);
        h.vertresolution = b.u(32);
        b.u(32);
        h.frame_count = b.u(16);
        let compressorname_length = Math.min(31, b.u(8));
        h.compressorname = b.readString(compressorname_length);
        if (compressorname_length < 31) {
          b.readString(31 - compressorname_length);
        }
        h.depth = b.u(16);
        b.u(16);
        headerLen = (b.get_position() - startBitPos) / 8;
        this.av01(b, h, h.size - headerLen);
        av1 = true;
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
    return av1;
  }

  av01(b: BitReader, box: any, length: number) {
    box.box = [];
    let bitPos = b.get_position();
    while (length > (b.get_position() - bitPos) / 8) {
      let startBitPos = b.get_position();
      let h: any = {};

      this.header(b, h);
      if (h.type == "av1C") {
        this.av1C(b, h);
      } else if (h.type == "fiel") {
        this.fiel(b, h);
      } else if (h.type == "pasp") {
        this.pasp(b, h);
      } else if (h.type == "btrt") {
        this.btrt(b, h);
      }

      h['@offset'] = startBitPos / 8;
      h['@length'] = h.size;
      h['@type'] = h.type;
      box.box.push(h);
      b.seek(startBitPos + h.size * 8);
    }
  }

  av1C(b: BitReader, h: any) {
    b.u(1);
    h.version = b.u(7);

    h.seq_profile = b.u(3);
    h.seq_level_idx_0 = b.u(5);

    h.seq_tier_0 = b.u(1);
    h.high_bitdepth = b.u(1);
    h.twelve_bit = b.u(1);
    h.monochrome = b.u(1);
    h.chroma_subsampling_x = b.u(1);
    h.chroma_subsampling_y = b.u(1);
    h.chroma_sample_position = b.u(2);

    h.reserved_1 = b.u(3);
    h.initial_presentation_delay_present = b.u(1);
    if (h.initial_presentation_delay_present) {
      h.initial_presentation_delay_minus_one = b.u(4);
    } else {
      h.reserved_2 = b.u(4);
    }
  }

  fiel(b: BitReader, h: any) {
    h.fieldCount = b.u(8);
    h.fieldOrdering = b.u(8);
  }

  pasp(b: BitReader, h: any) {
    h.hSpacing = b.u(32);
    h.vSpacing = b.u(32);
  }

  btrt(b: BitReader, h: any) {
    h.bufferSizeDB = b.u(32);
    h.maxBitrate = b.u(32);
    h.avgBitrate = b.u(32);
  }

  stts(b: BitReader, h: any) {
    this.fullHeader(b, h);
    h.entry_count = b.u(32);
    if (h.version === 0) {
      let sample_counts = [];
      let sample_deltas = [];
      for (let i = 0; i < h.entry_count; i++) {
        sample_counts.push(b.u(32));
        sample_deltas.push(b.u(32));
      }
      h.sample_counts = sample_counts.join(",");
      h.sample_deltas = sample_deltas.join(",");
    }
  }

  stss(b: BitReader, h: any) {
    this.fullHeader(b, h);
    h.entry_count = b.u(32);
    if (h.version === 0) {
      let sample_numbers = [];
      for (let i = 0; i < h.entry_count; i++) {
        sample_numbers.push(b.u(32));
      }
      h.sample_numbers = sample_numbers.join(",");
    }
  }

  stsc(b: BitReader, h: any) {
    this.fullHeader(b, h);
    h.entry_count = b.u(32);
    if (h.version === 0) {
      let first_chunk = [];
      let samples_per_chunk = [];
      let sample_description_index = [];
      for (let i = 0; i < h.entry_count; i++) {
        first_chunk.push(b.u(32));
        samples_per_chunk.push(b.u(32));
        sample_description_index.push(b.u(32));
      }
      h.first_chunk = first_chunk.join(",");
      h.samples_per_chunk = samples_per_chunk.join(",");
      h.sample_description_index = sample_description_index.join(",");
    }
  }

  stsz(b: BitReader, h: any) {
    this.fullHeader(b, h);
    if (h.version === 0) {
      let sample_sizes = [];
      h.sample_size = b.u(32);
      h.sample_count = b.u(32);
      for (let i = 0; i < h.sample_count; i++) {
        if (h.sample_size === 0) {
          sample_sizes.push(b.u(32));
        } else {
          sample_sizes[i] = h.sample_size;
        }
      }
      h.sample_sizes = sample_sizes.join(",");
    }
  }

  stco(b: BitReader, h: any) {
    this.fullHeader(b, h);
    h.entry_count = b.u(32);
    if (h.version === 0) {
      let chunk_offsets = [];
      for (let i = 0; i < h.entry_count; i++) {
        chunk_offsets.push(b.u(32));
      }
      h.chunk_offsets = chunk_offsets.join(",");
    }
  }

  mdat(b: BitReader, box: any) {
    if (!this.av1Box) return;
    let h: any;
    h = box.find((v: any) => v.type == "mdat");
    let bitPos = (h['@offset'] + 8) * 8;

    let stscBox = this.av1Box.box.find((o: any) => o.type == "stsc");
    let stszBox = this.av1Box.box.find((o: any) => o.type == "stsz");
    let stcoBox = this.av1Box.box.find((o: any) => o.type == "stco");
    let first_chunk = stscBox.first_chunk.split(",").map((v: string) => Number(v));
    let samples_per_chunk = stscBox.samples_per_chunk.split(",").map((v: string) => Number(v));
    let chunk_offsets = stcoBox.chunk_offsets.split(",").map((v: string) => Number(v));
    let sample_sizes = stszBox.sample_sizes.split(",").map((v: string) => Number(v));

    let obu = new OBU();
    first_chunk.shift();
    let sampleCount = samples_per_chunk.shift();
    for (let index = 0; index < chunk_offsets.length; index++) {
      if (first_chunk.length > 0 && index + 1 == first_chunk[0]) {
        first_chunk.shift();
        sampleCount = samples_per_chunk.shift();
      }
      b.seek(bitPos + chunk_offsets[index] * 8);

      let sampleIndex = 0;
      while (sampleIndex != sampleCount) {
        let sample_size = sample_sizes.shift();
        let pos = b.get_position() / 8;
        obu.parse(b.readBuffer(sample_size), pos);
        sampleIndex++;
      }
    }
  }
}
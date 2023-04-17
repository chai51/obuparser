import { BitReader } from "./BitReader";

// 3. Symbols and abbreviated terms
const REFS_PER_FRAME = 7;
const TOTAL_REFS_PER_FRAME = 8;
const BLOCK_SIZE_GROUPS = 4;
const BLOCK_SIZES = 22;
const BLOCK_INVALID = 22;
const MAX_SB_SIZE = 128;
const MI_SIZE = 4;
const MI_SIZE_LOG2 = 2;
const MAX_TILE_WIDTH = 4096;
const MAX_TILE_AREA = 4096 * 2304;
const MAX_TILE_ROWS = 64;
const MAX_TILE_COLS = 64;
const INTRABC_DELAY_PIXELS = 256;
const INTRABC_DELAY_SB64 = 4;
const NUM_REF_FRAMES = 8;
const IS_INTER_CONTEXTS = 4;
const REF_CONTEXTS = 3;
const MAX_SEGMENTS = 8;
const SEGMENT_ID_CONTEXTS = 3;
const SEG_LVL_ALT_Q = 0;
const SEG_LVL_ALT_LF_Y_V = 1;
const SEG_LVL_REF_FRAME = 5;
const SEG_LVL_SKIP = 6;
const SEG_LVL_GLOBALMV = 7;
const SEG_LVL_MAX = 8;
const PLANE_TYPES = 2;
const TX_SIZE_CONTEXTS = 3;
const INTERP_FILTERS = 3;
const INTERP_FILTER_CONTEXTS = 16;
const SKIP_MODE_CONTEXTS = 3;
const SKIP_CONTEXTS = 3;
const PARTITION_CONTEXTS = 4;
const TX_SIZES = 5;
const TX_SIZES_ALL = 19;
const TX_MODES = 3;
const DCT_DCT = 0;
const ADST_DCT = 1;
const DCT_ADST = 2;
const ADST_ADST = 3;
const FLIPADST_DCT = 4;
const DCT_FLIPADST = 5;
const FLIPADST_FLIPADST = 6;
const ADST_FLIPADST = 7;
const FLIPADST_ADST = 8;
const IDTX = 9;
const V_DCT = 10;
const H_DCT = 11;
const V_ADST = 12;
const H_ADST = 13;
const V_FLIPADST = 14;
const H_FLIPADST = 15;
const TX_TYPES = 16;
const MB_MODE_COUNT = 17;
const INTRA_MODES = 13;
const UV_INTRA_MODES_CFL_NOT_ALLOWED = 13;
const UV_INTRA_MODES_CFL_ALLOWED = 14;
const COMPOUND_MODES = 8;
const COMPOUND_MODE_CONTEXTS = 8;
const COMP_NEWMV_CTXS = 5;
const NEW_MV_CONTEXTS = 6;
const ZERO_MV_CONTEXTS = 2;
const REF_MV_CONTEXTS = 6;
const DRL_MODE_CONTEXTS = 3;
const MV_CONTEXTS = 2;
const MV_INTRABC_CONTEXT = 1;
const MV_JOINTS = 4;
const MV_CLASSES = 11;
const CLASS0_SIZE = 2;
const MV_OFFSET_BITS = 10;
const MAX_LOOP_FILTER = 63;
const REF_SCALE_SHIFT = 14;
const SUBPEL_BITS = 4;
const SUBPEL_MASK = 15;
const SCALE_SUBPEL_BITS = 10;
const MV_BORDER = 128;
const PALETTE_COLOR_CONTEXTS = 5;
const PALETTE_MAX_COLOR_CONTEXT_HASH = 8;
const PALETTE_BLOCK_SIZE_CONTEXTS = 7;
const PALETTE_Y_MODE_CONTEXTS = 3;
const PALETTE_UV_MODE_CONTEXTS = 2;
const PALETTE_SIZES = 7;
const PALETTE_COLORS = 8;
const PALETTE_NUM_NEIGHBORS = 3;
const DELTA_Q_SMALL = 3;
const DELTA_LF_SMALL = 3;
const QM_TOTAL_SIZE = 3344;
const MAX_ANGLE_DELTA = 3;
const DIRECTIONAL_MODES = 8;
const ANGLE_STEP = 3;
const TX_SET_TYPES_INTRA = 3;
const TX_SET_TYPES_INTER = 4;
const WARPEDMODEL_PREC_BITS = 16;
const IDENTITY = 0;
const TRANSLATION = 1;
const ROTZOOM = 2;
const AFFINE = 3;
const GM_ABS_TRANS_BITS = 12;
const GM_ABS_TRANS_ONLY_BITS = 9;
const GM_ABS_ALPHA_BITS = 12;
const DIV_LUT_PREC_BITS = 14;
const DIV_LUT_BITS = 8;
const DIV_LUT_NUM = 257;
const MOTION_MODES = 3;
const SIMPLE = 0;
const OBMC = 1;
const LOCALWARP = 2;
const LEAST_SQUARES_SAMPLES_MAX = 8;
const LS_MV_MAX = 256;
const WARPEDMODEL_TRANS_CLAMP = 1;
const WARPEDMODEL_NONDIAGAFFINE_CLAMP = 1;
const WARPEDPIXEL_PREC_SHIFTS = 1;
const WARPEDDIFF_PREC_BITS = 10;
const GM_ALPHA_PREC_BITS = 15;
const GM_TRANS_PREC_BITS = 6;
const GM_TRANS_ONLY_PREC_BITS = 3;
const INTERINTRA_MODES = 4;
const MASK_MASTER_SIZE = 64;
const SEGMENT_ID_PREDICTED_CONTEXTS = 3;
const FWD_REFS = 4;
const BWD_REFS = 3;
const SINGLE_REFS = 7;
const UNIDIR_COMP_REFS = 4;
const COMPOUND_TYPES = 2;
const CFL_JOINT_SIGNS = 8;
const CFL_ALPHABET_SIZE = 16;
const COMP_INTER_CONTEXTS = 5;
const COMP_REF_TYPE_CONTEXTS = 5;
const CFL_ALPHA_CONTEXTS = 6;
const INTRA_MODE_CONTEXTS = 5;
const COMP_GROUP_IDX_CONTEXTS = 6;
const COMPOUND_IDX_CONTEXTS = 6;
const INTRA_EDGE_KERNELS = 3;
const INTRA_EDGE_TAPS = 5;
const FRAME_LF_COUNT = 4;
const MAX_VARTX_DEPTH = 2;
const TXFM_PARTITION_CONTEXTS = 21;
const REF_CAT_LEVEL = 640;
const MAX_REF_MV_STACK_SIZE = 8;
const MFMV_STACK_SIZE = 3;
const MAX_TX_DEPTH = 2;
const WEDGE_TYPES = 16;
const FILTER_BITS = 7;
const WIENER_COEFFS = 3;
const SGRPROJ_PARAMS_BITS = 4;
const SGRPROJ_PRJ_SUBEXP_K = 4;
const SGRPROJ_PRJ_BITS = 7;
const SGRPROJ_RST_BITS = 4;
const SGRPROJ_MTABLE_BITS = 20;
const SGRPROJ_RECIP_BITS = 12;
const SGRPROJ_SGR_BITS = 8;
const EC_PROB_SHIFT = 6;
const EC_MIN_PROB = 4;
const SELECT_SCREEN_CONTENT_TOOLS = 2;
const SELECT_INTEGER_MV = 2;
const RESTORATION_TILESIZE_MAX = 256;
const MAX_FRAME_DISTANCE = 31;
const MAX_OFFSET_WIDTH = 8;
const MAX_OFFSET_HEIGHT = 0;
const WARP_PARAM_REDUCE_BITS = 6;
const NUM_BASE_LEVELS = 2;
const COEFF_BASE_RANGE = 12;
const BR_CDF_SIZE = 4;
const SIG_COEF_CONTEXTS_EOB = 4;
const SIG_COEF_CONTEXTS_2D = 26;
const SIG_COEF_CONTEXTS = 42;
const SIG_REF_DIFF_OFFSET_NUM = 5;
const SUPERRES_NUM = 8;
const SUPERRES_DENOM_MIN = 9;
const SUPERRES_DENOM_BITS = 3;
const SUPERRES_FILTER_BITS = 6;
const SUPERRES_FILTER_SHIFTS = 1;
const SUPERRES_FILTER_TAPS = 8;
const SUPERRES_FILTER_OFFSET = 3;
const SUPERRES_SCALE_BITS = 14;
const SUPERRES_SCALE_MASK = (1 << 14) - 1;
const SUPERRES_EXTRA_BITS = 8;
const TXB_SKIP_CONTEXTS = 13;
const EOB_COEF_CONTEXTS = 9;
const DC_SIGN_CONTEXTS = 3;
const LEVEL_CONTEXTS = 21;
const TX_CLASS_2D = 0;
const TX_CLASS_HORIZ = 1;
const TX_CLASS_VERT = 2;
const REFMVS_LIMIT = (1 << 12) - 1;
const INTRA_FILTER_SCALE_BITS = 4;
const INTRA_FILTER_MODES = 5;
const COEFF_CDF_Q_CTXS = 4;
const PRIMARY_REF_NONE = 7;
const BUFFER_POOL_MAX_SIZE = 10;

// 6.2.2. OBU header semantics
export const OBU_SEQUENCE_HEADER = 1;
export const OBU_TEMPORAL_DELIMITER = 2;
export const OBU_FRAME_HEADER = 3;
export const OBU_TILE_GROUP = 4;
export const OBU_METADATA = 5;
export const OBU_FRAME = 6;
export const OBU_REDUNDANT_FRAME_HEADER = 7;
export const OBU_TILE_LIST = 8;
export const OBU_PADDING = 9;

// 6.4.2. Color config semantics
const CP_BT_709 = 1;
const CP_UNSPECIFIED = 2;
const CP_BT_470_M = 4;
const CP_BT_470_B_G = 5;
const CP_BT_601 = 6;
const CP_SMPTE_240 = 7;
const CP_GENERIC_FILM = 8;
const CP_BT_2020 = 9;
const CP_XYZ = 10;
const CP_SMPTE_431 = 11;
const CP_SMPTE_432 = 12;
const CP_EBU_3213 = 22;

const TC_RESERVED_0 = 0;
const TC_BT_709 = 1;
const TC_UNSPECIFIED = 2;
const TC_RESERVED_3 = 3;
const TC_BT_470_M = 4;
const TC_BT_470_B_G = 5;
const TC_BT_601 = 6;
const TC_SMPTE_240 = 7;
const TC_LINEAR = 8;
const TC_LOG_100 = 9;
const TC_LOG_100_SQRT10 = 10;
const TC_IEC_61966 = 11;
const TC_BT_1361 = 12;
const TC_SRGB = 13;
const TC_BT_2020_10_BIT = 14;
const TC_BT_2020_12_BIT = 15;
const TC_SMPTE_2084 = 16;
const TC_SMPTE_428 = 17;
const TC_HLG = 18;

const MC_IDENTITY = 0;
const MC_BT_709 = 1;
const MC_UNSPECIFIED = 2;
const MC_RESERVED_3 = 3;
const MC_FCC = 4;
const MC_BT_470_B_G = 5;
const MC_BT_601 = 6;
const MC_SMPTE_240 = 7;
const MC_SMPTE_YCGCO = 8;
const MC_BT_2020_NCL = 9;
const MC_BT_2020_CL = 10;
const MC_SMPTE_2085 = 11;
const MC_CHROMAT_NCL = 12;
const MC_CHROMAT_CL = 13;
const MC_ICTCP = 14;

const CSP_UNKNOWN = 0;
const CSP_VERTICAL = 1;
const CSP_COLOCATED = 2;
const CSP_RESERVED = 3;

// 6.8.2. Uncompressed header semantics
const KEY_FRAME = 0;
const INTER_FRAME = 1;
const INTRA_ONLY_FRAME = 2;
const SWITCH_FRAME = 3;

// 6.8.9. Interpolation filter semantics
const EIGHTTAP = 0;
const EIGHTTAP_SMOOTH = 1;
const EIGHTTAP_SHARP = 2;
const BILINEAR = 3;
const SWITCHABLE = 4;

// 6.8.21. TX mode semantics
const ONLY_4X4 = 0;
const TX_MODE_LARGEST = 1;
const TX_MODE_SELECT = 2;

// 6.10.15. Loop restoration params semantics
const RESTORE_NONE = 0;
const RESTORE_SWITCHABLE = 3;
const RESTORE_WIENER = 1;
const RESTORE_SGRPROJ = 2;

// 6.10.24. Ref frames semantics
const SINGLE_REFERENCE = 0;
const COMPOUND_REFERENCE = 1;

const NONE = -1;
const INTRA_FRAME = 0;
const LAST_FRAME = 1;
const LAST2_FRAME = 2;
const LAST3_FRAME = 3;
const GOLDEN_FRAME = 4;
const BWDREF_FRAME = 5;
const ALTREF2_FRAME = 6;
const ALTREF_FRAME = 7;


let h: any;

export class OBU {
  seq_header: any;
  SeenFrameHeader: number;
  RefFrameType: any[];

  constructor() {
    this.SeenFrameHeader = 0;
    this.RefFrameType = new Array(NUM_REF_FRAMES);
  }

  parse(buffer: Uint8Array) {
    let obu: any[] = [];
    let b = new BitReader(buffer);
    while (buffer.length > b.get_position() / 8) {
      let h: any = {};

      let bitOffset = b.get_position();
      let bitPos = this.open_bitstream_unit(buffer.length - bitOffset / 8, { b, h });

      if (h.obu_type == OBU_SEQUENCE_HEADER) {
        this.seq_header = h;
      }

      h['@offset'] = bitOffset / 8;
      h['@length'] = (bitPos - bitOffset) / 8 + h.obu_size;
      obu.push(h);
      this.update_frame_buffers({ h });
      b.seek(bitPos + h.obu_size * 8);
    }
    return obu;
  }

  // 5.3.1. General OBU syntax
  open_bitstream_unit(sz: number, { b, h }: { b: BitReader, h: any }) {
    this.obu_header({ b, h });
    if (h.obu_has_size_field) {
      h.obu_size = b.leb128();
    } else {
      h.obu_size = sz - 1 - h.obu_extension_flag;
    }
    let startPosition = b.get_position();

    if (h.obu_type == OBU_SEQUENCE_HEADER)
      this.sequence_header_obu({ b, h });
    // else if (h.obu_type == OBU_TEMPORAL_DELIMITER)
    //   this.temporal_delimiter_obu();
    else if (h.obu_type == OBU_FRAME_HEADER)
      this.frame_header_obu({ b, h });
    else if (h.obu_type == OBU_REDUNDANT_FRAME_HEADER)
      this.frame_header_obu({ b, h });
    else if (h.obu_type == OBU_TILE_GROUP)
      this.tile_group_obu(h.obu_size, { b, h });
    // else if (h.obu_type == OBU_METADATA)
    //   this.metadata_obu();
    else if (h.obu_type == OBU_FRAME)
      this.frame_obu(h.obu_size, { b, h });
    // else if (h.obu_type == OBU_TILE_LIST)
    //   this.tile_list_obu();
    // else if (h.obu_type == OBU_PADDING)
    //   this.padding_obu();
    // else
    //   this.reserved_obu();

    // let currentPosition = b.get_position();
    // let payloadBits = currentPosition - startPosition;
    // if (h.obu_size > 0 && h.obu_type != OBU_TILE_GROUP &&
    //   h.obu_type != OBU_TILE_LIST &&
    //   h.obu_type != OBU_FRAME) {
    //   this.trailing_bits(h.obu_size * 8 - payloadBits);
    // }

    return startPosition;
  }

  // 5.3.2. OBU header syntax
  obu_header({ b, h }: { b: BitReader, h: any }) {
    h.obu_forbidden_bit = b.u(1);
    h.obu_type = b.u(4);
    h.obu_extension_flag = b.u(1);
    h.obu_has_size_field = b.u(1);
    h.obu_reserved_1bit = b.u(1);
    if (h.obu_extension_flag) {
      this.obu_extension_header({ b, h });
    }
  };

  // 5.3.3. OBU extension header syntax
  obu_extension_header({ b, h }: { b: BitReader, h: any }) {
    h.temporal_id = b.u(3);
    h.spatial_id = b.u(2);
    h.extension_header_reserved_3bits = b.u(3);
  }

  // 5.5.1. General sequence header OBU syntax
  sequence_header_obu({ b, h }: { b: BitReader, h: any }) {
    h.seq_profile = b.u(3);
    h.still_picture = b.u(1);
    h.reduced_still_picture_header = b.u(1);
    if (h.reduced_still_picture_header) {
      h.timing_info_present_flag = 0;
      h.decoder_model_info_present_flag = 0;
      h.initial_display_delay_present_flag = 0;
      h.operating_points_cnt_minus_1 = 0;
      h['operating_point_idc[0]'] = 0;
      h['seq_level_idx[0]'] = b.u(5);
      h['seq_tier[0]'] = 0;
      h['decoder_model_present_for_this_op[0]'] = 0;
      h['initial_display_delay_present_for_this_op[0]'] = 0;
    } else {
      h.timing_info_present_flag = b.u(1);
      if (h.timing_info_present_flag) {
        this.timing_info({ b, h });
        h.decoder_model_info_present_flag = b.u(1);
        if (h.decoder_model_info_present_flag) {
          this.decoder_model_info({ b, h });
        }
      } else {
        h.decoder_model_info_present_flag = 0;
      }
      h.initial_display_delay_present_flag = b.u(1);
      h.operating_points_cnt_minus_1 = b.u(5);
      for (let i = 0; i <= h.operating_points_cnt_minus_1; i++) {
        h[`operating_point_idc[${i}]`] = b.u(12);
        h[`seq_level_idx[${i}]`] = b.u(5);
        if (h[`seq_level_idx[${i}]`] > 7) {
          h[`seq_tier[${i}]`] = b.u(1);
        } else {
          h[`seq_tier[${i}]`] = 0;
        }
        if (h.decoder_model_info_present_flag) {
          h[`decoder_model_present_for_this_op[${i}]`] = b.u(1);
          if (h[`decoder_model_present_for_this_op[${i}]`]) {
            this.operating_parameters_info(i, { b, h });
          }
        } else {
          h[`decoder_model_present_for_this_op[${i}]`] = 0;
        }

        if (h.initial_display_delay_present_flag) {
          h[`initial_display_delay_present_for_this_op[${i}]`] = b.u(1);
          if (h[`initial_display_delay_present_for_this_op[${i}]`]) {
            h[`initial_display_delay_minus_1[${i}]`] = b.u(4);
          }
        }
      }
    }
    h.frame_width_bits_minus_1 = b.u(4);
    h.frame_height_bits_minus_1 = b.u(4);
    h.max_frame_width_minus_1 = b.u(h.frame_width_bits_minus_1 + 1);
    h.max_frame_height_minus_1 = b.u(h.frame_height_bits_minus_1 + 1);
    if (h.reduced_still_picture_header) {
      h.frame_id_numbers_present_flag = 0;
    } else {
      h.frame_id_numbers_present_flag = b.u(1);
    }
    if (h.frame_id_numbers_present_flag) {
      h.delta_frame_id_length_minus_2 = b.u(4);
      h.additional_frame_id_length_minus_1 = b.u(3);
    }
    h.use_128x128_superblock = b.u(1);
    h.enable_filter_intra = b.u(1);
    h.enable_intra_edge_filter = b.u(1);
    if (h.reduced_still_picture_header) {
      h.enable_interintra_compound = 0;
      h.enable_masked_compound = 0;
      h.enable_warped_motion = 0;
      h.enable_dual_filter = 0;
      h.enable_order_hint = 0;
      h.enable_jnt_comp = 0;
      h.enable_ref_frame_mvs = 0;
      h.seq_force_screen_content_tools = SELECT_SCREEN_CONTENT_TOOLS;
      h.seq_force_integer_mv = SELECT_INTEGER_MV;
      h['OrderHintBits'] = 0;
    } else {
      h.enable_interintra_compound = b.u(1);
      h.enable_masked_compound = b.u(1);
      h.enable_warped_motion = b.u(1);
      h.enable_dual_filter = b.u(1);
      h.enable_order_hint = b.u(1);
      if (h.enable_order_hint) {
        h.enable_jnt_comp = b.u(1);
        h.enable_ref_frame_mvs = b.u(1);
      } else {
        h.enable_jnt_comp = 0;
        h.enable_ref_frame_mvs = 0;
      }
      h.seq_choose_screen_content_tools = b.u(1);
      if (h.seq_choose_screen_content_tools) {
        h.seq_force_screen_content_tools = SELECT_SCREEN_CONTENT_TOOLS;
      } else {
        h.seq_force_screen_content_tools = b.u(1);
      }
      if (h.seq_force_screen_content_tools > 0) {
        h.seq_choose_integer_mv = b.u(1);
        if (h.seq_choose_integer_mv) {
          h.seq_force_integer_mv = SELECT_INTEGER_MV;
        } else {
          h.seq_force_integer_mv = b.u(1);
        }
      } else {
        h.seq_force_integer_mv = SELECT_INTEGER_MV;
      }
      if (h.enable_order_hint) {
        h.order_hint_bits_minus_1 = b.u(3);
        h['OrderHintBits'] = h.order_hint_bits_minus_1 + 1;
      } else {
        h['OrderHintBits'] = 0;
      }
    }
    h.enable_superres = b.u(1);
    h.enable_cdef = b.u(1);
    h.enable_restoration = b.u(1);

    this.color_config({ b, h });
    h.film_grain_params_present = b.u(1);
    return h;
  };

  // 5.5.2. Color config syntax
  color_config({ b, h }: { b: BitReader, h: any }) {
    h.high_bitdepth = b.u(1);
    if (h.seq_profile == 2 && h.high_bitdepth) {
      h.twelve_bit = b.u(1);
      h['BitDepth'] = h.twelve_bit ? 12 : 10;
    } else if (h.seq_profile <= 2) {
      h['BitDepth'] = h.high_bitdepth ? 10 : 8;
    }
    if (h.seq_profile == 1) {
      h.mono_chrome = 0;
    } else {
      h.mono_chrome = b.u(1);
    }
    h['NumPlanes'] = h.mono_chrome ? 1 : 3;
    h.color_description_present_flag = b.u(1);
    if (h.color_description_present_flag) {
      h.color_primaries = b.u(8);
      h.transfer_characteristics = b.u(8);
      h.matrix_coefficients = b.u(8);
    } else {
      h.color_primaries = CP_UNSPECIFIED;
      h.transfer_characteristics = TC_UNSPECIFIED;
      h.matrix_coefficients = MC_UNSPECIFIED;
    }
    if (h.mono_chrome) {
      h.color_range = b.u(1);
      h.subsampling_x = 1;
      h.subsampling_y = 1;
      h.chroma_sample_position = CSP_UNKNOWN;
      h.separate_uv_delta_q = 0;
      return;
    } else if (
      h.color_primaries == 1 && h.transfer_characteristics == 13 &&
      h.matrix_coefficients == 0) {
      h.color_range = 1;
      h.subsampling_x = 0;
      h.subsampling_y = 0;
    } else {
      h.color_range = b.u(1);
      if (h.seq_profile == 0) {
        h.subsampling_x = 1;
        h.subsampling_y = 1;
      } else if (h.seq_profile == 1) {
        h.subsampling_x = 0;
        h.subsampling_y = 0;
      } else {
        if (h['BitDepth'] == 12) {
          h.subsampling_x = b.u(1);
          if (h.subsampling_x)
            h.subsampling_y = b.u(1);
          else
            h.subsampling_y = 0;
        } else {
          h.subsampling_x = 1;
          h.subsampling_y = 0;
        }
      }
      if (h.subsampling_x && h.subsampling_y) {
        h.chroma_sample_position = b.u(2);
      }
    }
    h.separate_uv_delta_q = b.u(1);
  };

  // 5.5.3. Timing info syntax
  timing_info({ b, h }: { b: BitReader, h: any }) {
    h.num_units_in_display_tick = b.u(32);
    h.time_scale = b.u(32);
    h.equal_picture_interval = b.u(1);
    if (h.equal_picture_interval) {
      h.num_ticks_per_picture_minus_1 = b.uvlc();
    }
  }

  // 5.5.4. Decoder model info syntax
  decoder_model_info({ b, h }: { b: BitReader, h: any }) {
    h.buffer_delay_length_minus_1 = b.u(5);
    h.num_units_in_decoding_tick = b.u(32);
    h.buffer_removal_time_length_minus_1 = b.u(5);
    h.frame_presentation_time_length_minus_1 = b.u(5);
  }

  // 5.5.5. Operating parameters info syntax
  operating_parameters_info(op: number, { b, h }: { b: BitReader, h: any }) {
    let n = h.buffer_delay_length_minus_1 + 1;
    h[`decoder_buffer_delay[${op}]`] = b.u(n);
    h[`encoder_buffer_delay[${op}]`] = b.u(n);
    h[`low_delay_mode_flag[${op}]`] = b.u(1);
  }

  // 5.6. Temporal delimiter obu syntax
  temporal_delimiter_obu({ b, h }: { b: BitReader, h: any }) {
    this.SeenFrameHeader = 0;
  }

  // 5.9.1. General frame header OBU syntax
  frame_header_obu({ b, h }: { b: BitReader, h: any }) {
    if (h.SeenFrameHeader == 1) {

    } else {
      h.SeenFrameHeader = 1;
      this.uncompressed_header({ b, h });
      if (h.show_existing_frame) {
        this.decode_frame_wrapup({ b, h });
        h.SeenFrameHeader = 0;
      } else {
        h['TileNum'] = 0;
        h.SeenFrameHeader = 1;
      }
    }
  };

  // 5.9.2. Uncompressed header syntax  
  uncompressed_header({ b, h }: { b: BitReader, h: any }) {
    let idLen;
    if (this.seq_header.frame_id_numbers_present_flag) {
      idLen =
        this.seq_header.additional_frame_id_length_minus_1 +
        this.seq_header.delta_frame_id_length_minus_2 + 3;
    }
    let allFrames = (1 << NUM_REF_FRAMES) - 1;
    if (this.seq_header.reduced_still_picture_header) {
      h.show_existing_frame = 0;
      h.frame_type = KEY_FRAME;
      h['FrameIsIntra'] = 1;
      h.show_frame = 1;
      h.showable_frame = 0;
    } else {
      h.show_existing_frame = b.u(1);
      if (h.show_existing_frame == 1) {
        h.frame_to_show_map_idx = b.u(3);
        if (this.seq_header.decoder_model_info_present_flag &&
          !this.seq_header.equal_picture_interval) {
          this.temporal_point_info({ b, h });
        }
        h.refresh_frame_flags = 0;
        if (this.seq_header.frame_id_numbers_present_flag) {
          h.display_frame_id = b.u(idLen);
        }

        let ref_frame = this.RefFrameType[h.frame_to_show_map_idx];
        h.frame_type = ref_frame.frame_type;

        if (h.frame_type == KEY_FRAME) {
          h.refresh_frame_flags = allFrames;
        }
        if (this.seq_header.film_grain_params_present) {
          this.load_grain_params(h.frame_to_show_map_idx, { b, h });
        }
        return;
      }
      h.frame_type = b.u(2);
      h['FrameIsIntra'] =
        (h.frame_type == INTRA_ONLY_FRAME ||
          h.frame_type == KEY_FRAME)
      h.show_frame = b.u(1);
      if (h.show_frame && this.seq_header.decoder_model_info_present_flag &&
        !this.seq_header.equal_picture_interval) {
        this.temporal_point_info({ b, h });
      }
      if (h.show_frame) {
        h.showable_frame = Number(h.frame_type != KEY_FRAME);
      } else {
        h.showable_frame = b.u(1);
      }
      if (h.frame_type == SWITCH_FRAME ||
        (h.frame_type == KEY_FRAME && h.show_frame))
        h.error_resilient_mode = 1;
      else
        h.error_resilient_mode = b.u(1);
    }
    if (h.frame_type == KEY_FRAME && h.show_frame) {
      for (let i = 0; i < NUM_REF_FRAMES; i++) {
        h[`RefValid[${i}]`] = 0;
        h[`RefOrderHint[${i}]`] = 0;
      }
      for (let i = 0; i < REFS_PER_FRAME; i++) {
        h[`OrderHints[${LAST_FRAME + i}]`] = 0;
      }
    }

    h.disable_cdf_update = b.u(1);
    if (this.seq_header.seq_force_screen_content_tools == SELECT_SCREEN_CONTENT_TOOLS) {
      h.allow_screen_content_tools = b.u(1);
    } else {
      h.allow_screen_content_tools = this.seq_header.seq_force_screen_content_tools;
    }
    if (h.allow_screen_content_tools) {
      if (this.seq_header.seq_force_integer_mv == SELECT_INTEGER_MV) {
        h.force_integer_mv = b.u(1);
      } else {
        h.force_integer_mv = this.seq_header.seq_force_integer_mv;
      }
    } else {
      h.force_integer_mv = 0;
    }
    if (h['FrameIsIntra']) {
      h.force_integer_mv = 1;
    }
    if (this.seq_header.frame_id_numbers_present_flag) {
      h['PrevFrameID'] = h.current_frame_id;
      h.current_frame_id = b.u(idLen);
      this.mark_ref_frames(idLen, { b, h });
    } else {
      h.current_frame_id = 0;
    }
    if (h.frame_type == SWITCH_FRAME)
      h.frame_size_override_flag = 1;
    else if (this.seq_header.reduced_still_picture_header)
      h.frame_size_override_flag = 0;
    else
      h.frame_size_override_flag = b.u(1);
    h.order_hint = b.u(this.seq_header['OrderHintBits']);
    h['OrderHint'] = h.order_hint;
    if (h['FrameIsIntra'] || h.error_resilient_mode) {
      h.primary_ref_frame = PRIMARY_REF_NONE;
    } else {
      h.primary_ref_frame = b.u(3);
    }
    if (this.seq_header.decoder_model_info_present_flag) {
      h.buffer_removal_time_present_flag = b.u(1);
      if (h.buffer_removal_time_present_flag) {
        for (let opNum = 0; opNum <= this.seq_header.operating_points_cnt_minus_1; opNum++) {
          if (this.seq_header[`decoder_model_present_for_this_op[${opNum}]`]) {
            let opPtIdc = this.seq_header[`operating_point_idc[${opNum} ]`];
            let inTemporalLayer = (opPtIdc >> h.temporal_id) & 1;
            let inSpatialLayer = (opPtIdc >> (h.spatial_id + 8)) & 1;
            if (opPtIdc == 0 || (inTemporalLayer && inSpatialLayer)) {
              let n = this.seq_header.buffer_removal_time_length_minus_1 + 1;
              h[`buffer_removal_time[${opNum}]`] = b.u(n);
            }
          }
        }
      }
    }
    h.allow_high_precision_mv = 0;
    h.use_ref_frame_mvs = 0;
    h.allow_intrabc = 0;
    if (h.frame_type == SWITCH_FRAME ||
      (h.frame_type == KEY_FRAME && h.show_frame)) {
      h.refresh_frame_flags = allFrames;
    } else {
      h.refresh_frame_flags = b.u(8);
    }
    if (!h['FrameIsIntra'] || h.refresh_frame_flags != allFrames) {
      if (h.error_resilient_mode &&
        this.seq_header.enable_order_hint) {
        for (let i = 0; i < NUM_REF_FRAMES; i++) {
          h[`ref_order_hint[${i}]`] = b.u(this.seq_header['OrderHintBits']);
          if (h[`ref_order_hint[${i}]`])
            h[`RefValid[${i}]`] = 0;
        }
      }
    }

    if (h['FrameIsIntra']) {
      this.frame_size({ b, h });
      this.render_size({ b, h });
      if (this.seq_header.allow_screen_content_tools &&
        h['UpscaledWidth'] == h['FrameWidth']) {
        h.allow_intrabc = b.u(1);
      }
    } else {
      if (!this.seq_header.enable_order_hint) {
        h.frame_refs_short_signaling = 0;
      } else {
        h.frame_refs_short_signaling = b.u(1);
        if (h.frame_refs_short_signaling) {
          h.last_frame_idx = b.u(3);
          h.gold_frame_idx = b.u(3);
          this.set_frame_refs({ b, h });
        }
      }
      for (let i = 0; i < REFS_PER_FRAME; i++) {
        if (!h.frame_refs_short_signaling)
          h[`ref_frame_idx[${i}]`] = b.u(3);
        if (this.seq_header.frame_id_numbers_present_flag) {
          let n = this.seq_header.delta_frame_id_length_minus_2 + 2;
          h.delta_frame_id_minus_1 = b.u(n);
          h['DeltaFrameId'] = h.delta_frame_id_minus_1 + 1;
        }
      }

      if (this.seq_header.frame_size_override_flag &&
        !this.seq_header.error_resilient_mode) {
        this.frame_size_with_refs({ b, h });
      } else {
        this.frame_size({ b, h });
        this.render_size({ b, h });
      }

      if (h.force_integer_mv) {
        h.allow_high_precision_mv = 0;
      } else {
        h.allow_high_precision_mv = b.u(1);
      }
      this.read_interpolation_filter({ b, h });
      h.is_motion_mode_switchable = b.u(1);
      if (this.seq_header.error_resilient_mode ||
        !this.seq_header.enable_ref_frame_mvs) {
        h.use_ref_frame_mvs = 0;
      } else {
        h.use_ref_frame_mvs = b.u(1);
      }
      for (let i = 0; i < REFS_PER_FRAME; i++) {
        let refFrame = LAST_FRAME + i;
        let refFrameIdx = h[`ref_frame_idx[${i}]`];
        let hint = h[`RefOrderHint[${refFrameIdx}]`];
        h[`OrderHints[${refFrame}]`] = hint;
        if (!this.seq_header.enable_order_hint) {
          h[`RefFrameSignBias[${refFrame}]`] = 0;
        } else {
          h[`RefFrameSignBias[${refFrame}]`] = this.get_relative_dist(hint, h['OrderHint']) > 0;
        }
      }
    }

    if (this.seq_header.reduced_still_picture_header ||
      h.disable_cdf_update)
      h.disable_frame_end_update_cdf = 1;
    else
      h.disable_frame_end_update_cdf = b.u(1);

    if (h.primary_ref_frame == PRIMARY_REF_NONE) {
      this.init_non_coeff_cdfs({ b, h });
      this.setup_past_independence({ b, h });
    } else {
      this.load_cdfs(h[`ref_frame_idx[${h.primary_ref_frame}]`], { b, h });
      this.load_previous();
    }
    if (h.use_ref_frame_mvs == 1)
      this.motion_field_estimation({ b, h });
    this.tile_info({ b, h });
    this.quantization_params({ b, h });
    this.segmentation_params({ b, h });
    this.delta_q_params({ b, h });
    this.delta_lf_params({ b, h });
    if (h.primary_ref_frame == PRIMARY_REF_NONE) {
      this.init_coeff_cdfs({ b, h });
    } else {
      this.load_previous_segment_ids({ b, h });
    }
    h['CodedLossless'] = 1;
    for (let segmentId = 0; segmentId < MAX_SEGMENTS; segmentId++) {
      let qindex = this.get_qindex(1, segmentId, { h });
      h[`LosslessArray[${segmentId}]`] = qindex == 0 && h['DeltaQYDc'] == 0 &&
        h['DeltaQUAc'] == 0 && h['DeltaQUDc'] == 0 &&
        h['DeltaQVAc'] == 0 && h['DeltaQVDc'] == 0;
      if (!h[`LosslessArray[${segmentId}]`]) {
        h['CodedLossless'] = 0;
      }
      if (h.using_qmatrix) {
        if (h[`LosslessArray[${segmentId}]`]) {
          h[`SegQMLevel[0][${segmentId}]`] = 15;
          h[`SegQMLevel[1][${segmentId}]`] = 15;
          h[`SegQMLevel[2][${segmentId}]`] = 15;
        } else {
          h[`SegQMLevel[0][${segmentId}]`] = h.qm_y;
          h[`SegQMLevel[1][${segmentId}]`] = h.qm_u;
          h[`SegQMLevel[2][${segmentId}]`] = h.qm_v;
        }
      }
      h[`qindex[${segmentId}]`] = qindex;
    }
    h['AllLossless'] = h['CodedLossless'] && (h['FrameWidth'] == h['UpscaledWidth']);
    this.loop_filter_params({ b, h });
    this.cdef_params({ b, h });
    this.lr_params({ b, h });
    this.read_tx_mode({ b, h });
    this.frame_reference_mode({ b, h });
    this.skip_mode_params({ b, h });
    if (h['FrameIsIntra'] || h.error_resilient_mode ||
      !this.seq_header.enable_warped_motion)
      h.allow_warped_motion = 0;
    else
      h.allow_warped_motion = b.u(1);
    h.reduced_tx_set = b.u(1);
    this.global_motion_params({ b, h });
    this.film_grain_params({ b, h });
  };

  // 5.9.3. Get relative distance function
  get_relative_dist(a: number, b: number) {
    if (!this.seq_header.enable_order_hint)
      return 0;
    let diff = a - b;
    let m = 1 << (this.seq_header['OrderHintBits'] - 1);
    diff = (diff & (m - 1)) - (diff & m);
    return diff;
  };

  // 5.9.4. Reference frame marking function
  mark_ref_frames(idLen: number, { b, h }: { b: BitReader, h: any }) {
    let diffLen = h.delta_frame_id_length_minus_2 + 2;
    for (let i = 0; i < NUM_REF_FRAMES; i++) {
      if (h.current_frame_id > (1 << diffLen)) {
        if (h[`RefFrameId[${i}]`] > h.current_frame_id ||
          h[`RefFrameId[${i}]`] < (h.current_frame_id - (1 << diffLen)))
          h[`RefValid[${i}]`] = 0;
      } else {
        if (h[`RefFrameId[${i}]`] > h.current_frame_id &&
          h[`RefFrameId[${i}]`] < ((1 << idLen) +
            h.current_frame_id -
            (1 << diffLen)))
          h[`RefValid[${i}]`] = 0;
      }
    }
  }

  // 5.9.5. Frame size syntax
  frame_size({ b, h }: { b: BitReader, h: any }) {
    if (h.frame_size_override_flag) {
      let n = this.seq_header.frame_width_bits_minus_1 + 1;
      h.frame_width_minus_1 = b.u(n);
      n = this.seq_header.frame_height_bits_minus_1 + 1;
      h.frame_height_minus_1 = b.u(n);
      h['FrameWidth'] = h.frame_width_minus_1 + 1;
      h['FrameHeight'] = h.frame_height_minus_1 + 1;
    } else {
      h['FrameWidth'] = this.seq_header.max_frame_width_minus_1 + 1;
      h['FrameHeight'] = this.seq_header.max_frame_height_minus_1 + 1;
    }
    this.superres_params({ b, h });
    this.compute_image_size({ b, h });
  };

  // 5.9.6. Render size syntax
  render_size({ b, h }: { b: BitReader, h: any }) {
    h.render_and_frame_size_different = b.u(1);
    if (h.render_and_frame_size_different == 1) {
      h.render_width_minus_1 = b.u(16);
      h.render_height_minus_1 = b.u(16);
      h['RenderWidth'] = h.render_width_minus_1 + 1;
      h['RenderHeight'] = h.render_height_minus_1 + 1;
    } else {
      h['RenderWidth'] = h['UpscaledWidth'];
      h['RenderHeight'] = h['FrameHeight'];
    }
  };

  // 5.9.7. Frame size with refs syntax
  frame_size_with_refs({ b, h }: { b: BitReader, h: any }) {
    for (let i = 0; i < REFS_PER_FRAME; i++) {
      h.found_ref = b.u(1);
      if (h.found_ref == 1) {
        let ref_frame_idx = h[`ref_frame_idx[${i}]`];
        h['UpscaledWidth'] = h[`RefUpscaledWidth[${ref_frame_idx}]`];
        h['FrameWidth'] = h['UpscaledWidth'];
        h['FrameHeight'] = h[`RefFrameHeight[${ref_frame_idx}]`];
        h['RenderWidth'] = h[`RefRenderWidth[${ref_frame_idx}]`];
        h['RenderHeight'] = h[`RefRenderHeight[${ref_frame_idx}]`];
        break;
      }
    }
    if (h.found_ref == 0) {
      this.frame_size({ b, h });
      this.render_size({ b, h });
    } else {
      this.superres_params({ b, h });
      this.compute_image_size({ b, h });
    }
  }

  // 5.9.8. Superres params syntax
  superres_params({ b, h }: { b: BitReader, h: any }) {
    if (this.seq_header.enable_superres)
      h.use_superres = b.u(1);
    else
      h.use_superres = 0;
    if (h.use_superres) {
      h.coded_denom = b.u(SUPERRES_DENOM_BITS);
      h['SuperresDenom'] = h.coded_denom + SUPERRES_DENOM_MIN;
    } else {
      h['SuperresDenom'] = SUPERRES_NUM;
    }
    h['UpscaledWidth'] = h['FrameWidth'];
    h['FrameWidth'] = ((h['UpscaledWidth'] * SUPERRES_NUM +
      (h['SuperresDenom'] / 2)) / h['SuperresDenom']);
  };

  // 5.9.9. Compute image size function
  compute_image_size({ b, h }: { b: BitReader, h: any }) {
    h['MiCols'] = 2 * ((h['FrameWidth'] + 7) >> 3);
    h['MiRows'] = 2 * ((h['FrameHeight'] + 7) >> 3);
  }

  // 5.9.10. Interpolation filter syntax
  read_interpolation_filter({ b, h }: { b: BitReader, h: any }) {
    h.is_filter_switchable = b.u(1);
    if (h.is_filter_switchable == 1) {
      h.interpolation_filter = SWITCHABLE;
    } else {
      h.interpolation_filter = b.u(2);
    }
  }

  // 5.9.11. Loop filter params syntax
  loop_filter_params({ b, h }: { b: BitReader, h: any }) {
    if (h['CodedLossless'] || h.allow_intrabc) {
      h['loop_filter_level[0]'] = 0;
      h['loop_filter_level[1]'] = 0;
      h[`loop_filter_ref_deltas[${INTRA_FRAME}]`] = 1;
      h[`loop_filter_ref_deltas[${LAST_FRAME}]`] = 0;
      h[`loop_filter_ref_deltas[${LAST2_FRAME}]`] = 0;
      h[`loop_filter_ref_deltas[${LAST3_FRAME}]`] = 0;
      h[`loop_filter_ref_deltas[${BWDREF_FRAME}]`] = 0;
      h[`loop_filter_ref_deltas[${GOLDEN_FRAME}]`] = -1;
      h[`loop_filter_ref_deltas[${ALTREF_FRAME}]`] = -1;
      h[`loop_filter_ref_deltas[${ALTREF2_FRAME}]`] = -1;
      for (let i = 0; i < 2; i++) {
        h[`loop_filter_mode_deltas[${i}]`] = 0;
      }
      return;
    }
    h['loop_filter_level[0]'] = b.u(6);
    h['loop_filter_level[1]'] = b.u(6);
    if (this.seq_header['NumPlanes'] > 1) {
      if (h['loop_filter_level[0]'] || h['loop_filter_level[1]']) {
        h['loop_filter_level[2]'] = b.u(6);
        h['loop_filter_level[3]'] = b.u(6);
      }
    }
    h.loop_filter_sharpness = b.u(3);
    h.loop_filter_delta_enabled = b.u(1);
    if (h.loop_filter_delta_enabled) {
      h.loop_filter_delta_update = b.u(1);
      if (h.loop_filter_delta_update) {
        for (let i = 0; i < TOTAL_REFS_PER_FRAME; i++) {
          let update_ref_delta = b.u(1);
          if (update_ref_delta) {
            h[`loop_filter_ref_deltas[${i}]`] = b.su(1 + 6);
          }
          h[`update_ref_delta[${i}]`] = update_ref_delta;
        }
        for (let i = 0; i < 2; i++) {
          let update_mode_delta = b.u(1);
          if (update_mode_delta) {
            h[`loop_filter_mode_deltas[${i}]`] = b.su(1 + 6);
          }
          h[`update_mode_delta[${i}]`] = update_mode_delta;
        }
      }
    }
  };

  // 5.9.12. Quantization params syntax
  quantization_params({ b, h }: { b: BitReader, h: any }) {
    h.base_q_idx = b.u(8);
    h['DeltaQYDc'] = this.read_delta_q({ b, h });
    if (this.seq_header['NumPlanes'] > 1) {
      if (this.seq_header.separate_uv_delta_q)
        h.diff_uv_delta = b.u(1);
      else
        h.diff_uv_delta = 0;
      h['DeltaQUDc'] = this.read_delta_q({ b, h });
      h['DeltaQUAc'] = this.read_delta_q({ b, h });
      if (h.diff_uv_delta) {
        h['DeltaQVDc'] = this.read_delta_q({ b, h });
        h['DeltaQVAc'] = this.read_delta_q({ b, h });
      } else {
        h['DeltaQVDc'] = h['DeltaQUDc'];
        h['DeltaQVAc'] = h['DeltaQUAc'];
      }
    } else {
      h['DeltaQUDc'] = 0;
      h['DeltaQUAc'] = 0;
      h['DeltaQVDc'] = 0;
      h['DeltaQVAc'] = 0;
    }
    h.using_qmatrix = b.u(1);
    if (h.using_qmatrix) {
      h.qm_y = b.u(4);
      h.qm_u = b.u(4);
      if (!this.seq_header.separate_uv_delta_q)
        h.qm_v = h.qm_u;
      else
        h.qm_v = b.u(4);
    }
  };

  // 5.9.13. Delta quantizer syntax
  read_delta_q({ b, h }: { b: BitReader, h: any }) {
    let delta_q = 0;
    let delta_coded = b.u(1);
    if (delta_coded) delta_q = b.su(1 + 6);
    return delta_q;
  };

  // 5.9.14. Segmentation params syntax
  segmentation_params({ b, h }: { b: BitReader, h: any }) {
    let Segmentation_Feature_Bits = [8, 6, 6, 6, 6, 3, 0, 0];
    let Segmentation_Feature_Signed = [1, 1, 1, 1, 1, 0, 0, 0];
    let Segmentation_Feature_Max = [255, MAX_LOOP_FILTER, MAX_LOOP_FILTER, MAX_LOOP_FILTER, MAX_LOOP_FILTER, 7, 0, 0];

    h.segmentation_enabled = b.u(1);
    if (h.segmentation_enabled == 1) {
      if (h.primary_ref_frame == PRIMARY_REF_NONE) {
        h.segmentation_update_map = 1;
        h.segmentation_temporal_update = 0;
        h.segmentation_update_data = 1;
      } else {
        h.segmentation_update_map = b.u(1);
        if (h.segmentation_update_map == 1)
          h.segmentation_temporal_update = b.u(1);
        h.segmentation_update_data = b.u(1);
      }
      if (h.segmentation_update_data == 1) {
        for (let i = 0; i < MAX_SEGMENTS; i++) {
          for (let j = 0; j < SEG_LVL_MAX; j++) {
            let feature_value = 0;
            let feature_enabled = b.u(1);
            h[`FeatureEnabled[${i}][${j}]`] = feature_enabled;
            let clippedValue = 0;
            if (feature_enabled) {
              let bitsToRead = Segmentation_Feature_Bits[j];
              let limit = Segmentation_Feature_Max[j];
              if (Segmentation_Feature_Signed[j] == 1) {
                feature_value = b.su(1 + bitsToRead);
                clippedValue = this.Clip3(-limit, limit, feature_value);
              } else {
                feature_value = b.u(bitsToRead);
                clippedValue = this.Clip3(0, limit, feature_value);
              }
            }
            h[`FeatureData[${i}][${j}]`] = clippedValue;
            h[`feature_value[${i}][${j}]`] = feature_value;
            h[`feature_enabled[${i}][${j}]`] = feature_enabled;
          }
        }
      }
    } else {
      for (let i = 0; i < MAX_SEGMENTS; i++) {
        for (let j = 0; j < SEG_LVL_MAX; j++) {
          h[`FeatureEnabled[${i}][${j}]`] = 0;
          h[`FeatureData[${i}][${j}]`] = 0;
        }
      }
    }
    h['SegIdPreSkip'] = 0;
    h['LastActiveSegId'] = 0;
    for (let i = 0; i < MAX_SEGMENTS; i++) {
      for (let j = 0; j < SEG_LVL_MAX; j++) {
        if (h[`FeatureEnabled[${i}][${j}]`]) {
          h['LastActiveSegId'] = i;
          if (j >= SEG_LVL_REF_FRAME) {
            h['SegIdPreSkip'] = 1;
          }
        }
      }
    }
  };

  // 5.9.15. Tile info syntax
  tile_info({ b, h }: { b: BitReader, h: any }) {
    let sbCols = this.seq_header.use_128x128_superblock ? ((h['MiCols'] + 31) >> 5) : ((h['MiCols'] + 15) >> 4);
    let sbRows = this.seq_header.use_128x128_superblock ? ((h['MiRows'] + 31) >> 5) : ((h['MiRows'] + 15) >> 4);
    let sbShift = this.seq_header.use_128x128_superblock ? 5 : 4
    let sbSize = sbShift + 2;
    let maxTileWidthSb = MAX_TILE_WIDTH >> sbSize;
    let maxTileAreaSb = MAX_TILE_AREA >> (2 * sbSize);
    let minLog2TileCols = this.tile_log2(maxTileWidthSb, sbCols);
    let maxLog2TileCols = this.tile_log2(1, Math.min(sbCols, MAX_TILE_COLS));
    let maxLog2TileRows = this.tile_log2(1, Math.min(sbRows, MAX_TILE_ROWS));
    let minLog2Tiles =
      Math.max(minLog2TileCols, this.tile_log2(maxTileAreaSb, sbRows * sbCols))

    h.uniform_tile_spacing_flag = b.u(1);
    if (h.uniform_tile_spacing_flag) {
      h['TileColsLog2'] = minLog2TileCols;
      while (h['TileColsLog2'] < maxLog2TileCols) {
        let increment_tile_cols_log2 = b.u(1);
        if (increment_tile_cols_log2 == 1)
          h['TileColsLog2']++;
        else
          break;
      }
      let tileWidthSb = (sbCols + (1 << h['TileColsLog2']) - 1) >> h['TileColsLog2'];
      let i = 0;
      for (let startSb = 0; startSb < sbCols; startSb += tileWidthSb) {
        h[`MiColStarts[${i}]`] = startSb << sbShift;
        i += 1;
      }
      h[`MiColStarts[${i}]`] = h['MiCols'];
      h['TileCols'] = i;

      let minLog2TileRows = Math.max(minLog2Tiles - h['TileColsLog2'], 0);
      h['TileRowsLog2'] = minLog2TileRows;
      while (h['TileRowsLog2'] < maxLog2TileRows) {
        let increment_tile_rows_log2 = b.u(1);
        if (increment_tile_rows_log2 == 1)
          h['TileRowsLog2']++;
        else
          break;
      }
      let tileHeightSb = (sbRows + (1 << h['TileRowsLog2']) - 1) >> h['TileRowsLog2'];
      i = 0;
      for (let startSb = 0; startSb < sbRows; startSb += tileHeightSb) {
        h[`MiRowStarts[${i}]`] = startSb << sbShift;
        i += 1;
      }
      h[`MiRowStarts[${i}]`] = h['MiRows'];
      h['TileRows'] = i;
    } else {
      let widestTileSb = 0;
      let startSb = 0;
      let sizeSb = 0;
      let i;
      for (i = 0; startSb < sbCols; i++) {
        h[`MiColStarts[${i}]`] = startSb << sbShift;
        let maxWidth = Math.min(sbCols - startSb, maxTileWidthSb);
        h.width_in_sbs_minus_1 = b.ns(maxWidth);
        let sizeSb = h.width_in_sbs_minus_1 + 1;
        widestTileSb = Math.max(sizeSb, widestTileSb);
        startSb += sizeSb;
      }
      h[`MiColStarts[${i}]`] = h['MiCols'];
      h['TileCols'] = i;
      h['TileColsLog2'] = this.tile_log2(1, h['TileCols']);

      let maxTileAreaSb = 0;
      if (minLog2Tiles > 0)
        maxTileAreaSb = (sbRows * sbCols) >> (minLog2Tiles + 1);
      else
        maxTileAreaSb = sbRows * sbCols;
      let maxTileHeightSb = Math.max(maxTileAreaSb / widestTileSb, 1);

      startSb = 0;
      for (i = 0; startSb < sbRows; i++) {
        h[`MiRowStarts[${i}]`] = startSb << sbShift;
        let maxHeight = Math.min(sbRows - startSb, maxTileHeightSb);
        h.height_in_sbs_minus_1 = b.ns(maxHeight);
        sizeSb = h.height_in_sbs_minus_1 + 1;
        startSb += sizeSb;
      }
      h[`MiRowStarts[${i}]`] = h['MiRows'];
      h['TileRows'] = i;
      h['TileRowsLog2'] = this.tile_log2(1, h['TileRows']);
    }
    if (h['TileColsLog2'] > 0 || h['TileRowsLog2'] > 0) {
      h.context_update_tile_id = b.u(h['TileRowsLog2'] + h['TileColsLog2']);
      h.tile_size_bytes_minus_1 = b.u(2);
      h['TileSizeBytes'] = h.tile_size_bytes_minus_1 + 1;
    } else {
      h.context_update_tile_id = 0;
    }
  };

  // 5.9.16. Tile size calculation function
  tile_log2(blkSize: number, target: number) {
    let k = 0;
    for (k = 0; (blkSize << k) < target; k++) {
    }
    return k;
  };

  // 5.9.17. Quantizer index delta parameters syntax
  delta_q_params({ b, h }: { b: BitReader, h: any }) {
    h.delta_q_res = 0;
    h.delta_q_present = 0;
    if (h.base_q_idx > 0) {
      h.delta_q_present = b.u(1);
    }
    if (h.delta_q_present) {
      h.delta_q_res = b.u(2);
    }
  };

  // 5.9.18. Loop filter delta parameters syntax
  delta_lf_params({ b, h }: { b: BitReader, h: any }) {
    h.delta_lf_present = 0;
    h.delta_lf_res = 0;
    h.delta_lf_multi = 0;
    if (h.delta_q_present) {
      if (!h.allow_intrabc) {
        h.delta_lf_present = b.u(1);
      }
      if (h.delta_lf_present) {
        h.delta_lf_res = b.u(2);
        h.delta_lf_multi = b.u(1);
      }
    }
  };

  // 5.9.19. CDEF params syntax
  cdef_params({ b, h }: { b: BitReader, h: any }) {
    if (h['CodedLossless'] || h.allow_intrabc ||
      !this.seq_header.enable_cdef) {
      h.cdef_bits = 0;
      h['cdef_y_pri_strength[0]'] = 0;
      h['cdef_y_sec_strength[0]'] = 0;
      h['cdef_uv_pri_strength[0]'] = 0;
      h['cdef_uv_sec_strength[0]'] = 0;
      h['CdefDamping'] = 3;
      return;
    }
    h.cdef_damping_minus_3 = b.u(2);
    h['CdefDamping'] = h.cdef_damping_minus_3 + 3;
    h.cdef_bits = b.u(2);
    for (let i = 0; i < (1 << h.cdef_bits); i++) {
      h[`cdef_y_pri_strength[${i}]`] = b.u(4);
      h[`cdef_y_sec_strength[${i}]`] = b.u(2);
      if (h[`cdef_y_sec_strength[${i}]`] == 3) {
        h[`cdef_y_sec_strength[${i}]`] += 1;
      }
      if (this.seq_header['NumPlanes'] > 1) {
        h[`cdef_uv_pri_strength[${i}]`] = b.u(4);
        h[`cdef_uv_sec_strength[${i}]`] = b.u(2);
        if (h[`cdef_uv_sec_strength[${i}]`] == 3) {
          h[`cdef_uv_sec_strength[${i}]`] += 1;
        }
      }
    }
  };

  // 5.9.20. Loop restoration params syntax
  lr_params({ b, h }: { b: BitReader, h: any }) {
    if (h['AllLossless'] || h.allow_intrabc ||
      !this.seq_header.enable_restoration) {
      h['FrameRestorationType[0]'] = RESTORE_NONE;
      h['FrameRestorationType[1]'] = RESTORE_NONE;
      h['FrameRestorationType[2]'] = RESTORE_NONE;
      h['UsesLr'] = 0;
      return;
    }
    const Remap_Lr_Type = [RESTORE_NONE, RESTORE_SWITCHABLE, RESTORE_WIENER, RESTORE_SGRPROJ];
    h['UsesLr'] = 0;
    let usesChromaLr = 0;
    for (let i = 0; i < this.seq_header['NumPlanes']; i++) {
      let lr_type = b.u(2);
      h[`FrameRestorationType[${i}]`] = Remap_Lr_Type[lr_type];
      if (h[`FrameRestorationType[${i}]`] != RESTORE_NONE) {
        h['UsesLr'] = 1;
        if (i > 0) {
          usesChromaLr = 1
        }
      }
      h[`lr_type[${i}]`] = lr_type;
    }
    if (h['UsesLr']) {
      if (this.seq_header.use_128x128_superblock) {
        h.lr_unit_shift = b.u(1);
        h.lr_unit_shift++;
      } else {
        h.lr_unit_shift = b.u(1);
        if (h.lr_unit_shift) {
          h.lr_unit_extra_shift = b.u(1);
          h.lr_unit_shift += h.lr_unit_extra_shift;
        }
      }
      h['LoopRestorationSize[0]'] = RESTORATION_TILESIZE_MAX >> (2 - h.lr_unit_shift);
      if (this.seq_header.subsampling_x && this.seq_header.subsampling_y && usesChromaLr) {
        h.lr_uv_shift = b.u(1);
      } else {
        h.lr_uv_shift = 0;
      }
      h['LoopRestorationSize[1]'] = h['LoopRestorationSize[0]'] >> h.lr_uv_shift;
      h['LoopRestorationSize[2]'] = h['LoopRestorationSize[0]'] >> h.lr_uv_shift;
    }
  };

  // 5.9.21. TX mode syntax
  read_tx_mode({ b, h }: { b: BitReader, h: any }) {
    if (h['CodedLossless'] == 1) {
      h['TxMode'] = ONLY_4X4;
    } else {
      h.tx_mode_select = b.u(1);
      if (h.tx_mode_select) {
        h['TxMode'] = TX_MODE_SELECT;
      } else {
        h['TxMode'] = TX_MODE_LARGEST;
      }
    }
  }

  // 5.9.22. Skip mode params syntax
  skip_mode_params({ b, h }: { b: BitReader, h: any }) {
    let skipModeAllowed;
    if (h['FrameIsIntra'] || !h.reference_select || !this.seq_header.enable_order_hint) {
      skipModeAllowed = 0;
    } else {
      let forwardIdx = -1;
      let backwardIdx = -1;
      let forwardHint = -1;
      let backwardHint = 0;
      for (let i = 0; i < REFS_PER_FRAME; i++) {
        let refFrameIdx = h[`ref_frame_idx[${i}`];
        let refHint = h[`RefOrderHint[${refFrameIdx}]`];
        if (this.get_relative_dist(refHint, h['OrderHint']) < 0) {
          if (forwardIdx < 0 ||
            this.get_relative_dist(refHint, forwardHint) > 0) {
            forwardIdx = i;
            forwardHint = refHint;
          }
        } else if (this.get_relative_dist(refHint, h['OrderHint']) > 0) {
          if (backwardIdx < 0 ||
            this.get_relative_dist(refHint, backwardHint) < 0) {
            backwardIdx = i;
            backwardHint = refHint;
          }
        }
      }
      if (forwardIdx < 0) {
        skipModeAllowed = 0;
      } else if (backwardIdx >= 0) {
        skipModeAllowed = 1;
        h['SkipModeFrame[0]'] = LAST_FRAME + Math.min(forwardIdx, backwardIdx);
        h['SkipModeFrame[1]'] = LAST_FRAME + Math.max(forwardIdx, backwardIdx)
      } else {
        let secondForwardIdx = -1;
        let secondForwardHint = -1;
        for (let i = 0; i < REFS_PER_FRAME; i++) {
          let refFrameIdx = h[`ref_frame_idx${i}`];
          let refHint = h[`RefOrderHint[${refFrameIdx}]`];
          if (this.get_relative_dist(refHint, forwardHint) < 0) {
            if (secondForwardIdx < 0 ||
              this.get_relative_dist(refHint, secondForwardHint) > 0) {
              secondForwardIdx = i;
              secondForwardHint = refHint;
            }
          }
        }
        if (secondForwardIdx < 0) {
          skipModeAllowed = 0;
        } else {
          skipModeAllowed = 1;
          h['SkipModeFrame[0]'] = LAST_FRAME + Math.min(forwardIdx, secondForwardIdx);
          h['SkipModeFrame[1]'] = LAST_FRAME + Math.max(forwardIdx, secondForwardIdx);
        }
      }
    }
    if (skipModeAllowed) {
      h.skip_mode_present = b.u(1);
    } else {
      h.skip_mode_present = 0;
    }
  };

  // 5.9.23. Frame reference mode syntax
  frame_reference_mode({ b, h }: { b: BitReader, h: any }) {
    if (h['FrameIsIntra']) {
      h.reference_select = 0;
    } else {
      h.reference_select = b.u(1);
    }
  }

  // 5.9.24. Global motion params syntax
  global_motion_params({ b, h }: { b: BitReader, h: any }) {
    for (let ref = LAST_FRAME; ref <= ALTREF_FRAME; ref++) {
      h[`GmType[${ref}]`] = IDENTITY;
      for (let i = 0; i < 6; i++) {
        h[`gm_params[${ref}][${i}]`] = ((i % 3 == 2) ? 1 << WARPEDMODEL_PREC_BITS : 0);
      }
    }
    if (h['FrameIsIntra']) {
      return;
    }
    for (let ref = LAST_FRAME; ref <= ALTREF_FRAME; ref++) {
      h[`is_global[${ref}]`] = b.u(1);
      let type;
      if (h[`is_global[${ref}]`]) {
        h[`is_rot_zoom[${ref}]`] = b.u(1);
        if (h[`is_rot_zoom[${ref}]`]) {
          type = ROTZOOM;
        } else {
          h[`is_translation[${ref}]`] = b.u(1);
          type = h[`is_translation[${ref}]`] ? TRANSLATION : AFFINE;
        }
      } else {
        type = IDENTITY;
      }
      h[`GmType[${ref}]`] = type;
      if (type >= ROTZOOM) {
        this.read_global_param(type, ref, 2, { b, h });
        this.read_global_param(type, ref, 3, { b, h });
        if (type == AFFINE) {
          this.read_global_param(type, ref, 4, { b, h });
          this.read_global_param(type, ref, 5, { b, h });
        } else {
          h[`gm_params[${ref}][4]`] = -h[`gm_params[${ref}][3]`];
          h[`gm_params[${ref}][5]`] = h[`gm_params[${ref}][2]`];
        }
      }
      if (type >= TRANSLATION) {
        this.read_global_param(type, ref, 0, { b, h });
        this.read_global_param(type, ref, 1, { b, h });
      }
    }
  };

  // 5.9.25. Global param syntax
  read_global_param(type: number, ref: number, idx: number, { b, h }: { b: BitReader, h: any }) {
    let absBits = GM_ABS_ALPHA_BITS;
    let precBits = GM_ALPHA_PREC_BITS;
    if (idx < 2) {
      if (type == TRANSLATION) {
        absBits = GM_ABS_TRANS_ONLY_BITS - (1 - h.allow_high_precision_mv);
        precBits = GM_TRANS_ONLY_PREC_BITS - (1 - h.allow_high_precision_mv);
      } else {
        absBits = GM_ABS_TRANS_BITS;
        precBits = GM_TRANS_PREC_BITS;
      }
    }
    let precDiff = WARPEDMODEL_PREC_BITS - precBits;
    let round = (idx % 3) == 2 ? (1 << WARPEDMODEL_PREC_BITS) : 0;
    let sub = (idx % 3) == 2 ? (1 << precBits) : 0;
    let mx = (1 << absBits);
    let r = (h[`PrevGmParams[${ref}][${idx}]`] >> precDiff) - sub;
    h[`gm_params[${ref}][${idx}]`] =
      (this.decode_signed_subexp_with_ref(-mx, mx + 1, r, { b, h }) << precDiff) + round;
  };

  // 5.9.26. Decode signed subexp with ref syntax
  decode_signed_subexp_with_ref(low: number, high: number, r: number, { b, h }: { b: BitReader, h: any }) {
    let x = this.decode_unsigned_subexp_with_ref(high - low, r - low, { b, h });
    return x + low;
  };

  // 5.9.27. Decode unsigned subexp with ref syntax
  decode_unsigned_subexp_with_ref(mx: number, r: number, { b, h }: { b: BitReader, h: any }) {
    let v = this.decode_subexp(mx, { b, h });
    if ((r << 1) <= mx) {
      return this.inverse_recenter(r, v);
    } else {
      return mx - 1 - this.inverse_recenter(mx - 1 - r, v);
    }
  };

  // 5.9.28. Decode subexp syntax
  decode_subexp(numSyms: number, { b, h }: { b: BitReader, h: any }) {
    let i = 0;
    let mk = 0;
    let k = 3;
    let n = 0;
    while (1) {
      let b2 = i ? k + i - 1 : k;
      let a = 1 << b2;
      if (numSyms <= mk + 3 * a) {
        h[`subexp_final_bits[${n}]`] = b.ns(numSyms - mk);
        return h[`subexp_final_bits[${n}]`] + mk;
      } else {
        h[`subexp_more_bits[${n}]`] = b.u(1);
        if (h[`subexp_more_bits[${n}]`]) {
          i++;
          mk += a;
        } else {
          h[`subexp_bits[${n}]`] = b.u(b2);
          return h[`subexp_bits[${n}]`] + mk;
        }
      }
      ++n;
    }
  };

  // 5.9.29. Inverse recenter function
  inverse_recenter(r: number, v: number) {
    if (v > 2 * r)
      return v;
    else if (v & 1)
      return r - ((v + 1) >> 1);
    else
      return r + (v >> 1);
  };

  // 5.9.30. Film grain params syntax
  film_grain_params({ b, h }: { b: BitReader, h: any }) {
    if (!this.seq_header.film_grain_params_present ||
      (!h.show_frame && !h.showable_frame)) {
      this.reset_grain_params({ b, h });
      return;
    }
    h.apply_grain = b.u(1);
    if (!h.apply_grain) {
      this.reset_grain_params({ b, h });
      return;
    }
    h.grain_seed = b.u(16);
    if (h.frame_type == INTER_FRAME)
      h.update_grain = b.u(1);
    else
      h.update_grain = 1;
    if (!h.update_grain) {
      h.film_grain_params_ref_idx = b.u(3);
      let tempGrainSeed = h.grain_seed;
      this.load_grain_params(h.film_grain_params_ref_idx, { b, h });
      h.grain_seed = tempGrainSeed;
      return;
    }
    h.num_y_points = b.u(4);
    for (let i = 0; i < h.num_y_points; i++) {
      h[`point_y_value[${i}]`] = b.u(8);
      h[`point_y_scaling[${i}]`] = b.u(8);
    }
    if (this.seq_header.mono_chrome) {
      h.chroma_scaling_from_luma = 0;
    } else {
      h.chroma_scaling_from_luma = b.u(1);
    }
    if (this.seq_header.mono_chrome || this.seq_header.chroma_scaling_from_luma ||
      (this.seq_header.subsampling_x == 1 && this.seq_header.subsampling_y == 1 &&
        h.num_y_points == 0)) {
      h.num_cb_points = 0;
      h.num_cr_points = 0;
    } else {
      h.num_cb_points = b.u(4);
      for (let i = 0; i < h.num_cb_points; i++) {
        h[`point_cb_value[${i}]`] = b.u(8);
        h[`point_cb_scaling[${i}]`] = b.u(8);
      }
      h.num_cr_points = b.u(4);
      for (let i = 0; i < h.num_cr_points; i++) {
        h[`point_cr_value[${i}]`] = b.u(8);
        h[`point_cr_scaling[${i}]`] = b.u(8);
      }
    }
    h.grain_scaling_minus_8 = b.u(2);
    h.ar_coeff_lag = b.u(2);
    let numPosLuma = 2 * h.ar_coeff_lag * (h.ar_coeff_lag + 1);
    let numPosChroma;
    if (h.num_y_points) {
      numPosChroma = numPosLuma + 1;
      for (let i = 0; i < numPosLuma; i++)
        h[`ar_coeffs_y_plus_128[${i}]`] = b.u(8);
    } else {
      numPosChroma = numPosLuma;
    }
    if (h.chroma_scaling_from_luma || h.num_cb_points) {
      for (let i = 0; i < numPosChroma; i++)
        h[`ar_coeffs_cb_plus_128[${i}]`] = b.u(8);
    }
    if (h.chroma_scaling_from_luma || h.num_cr_points) {
      for (let i = 0; i < numPosChroma; i++)
        h[`ar_coeffs_cr_plus_128[${i}]`] = b.u(8);
    }
    h.ar_coeff_shift_minus_6 = b.u(2);
    h.grain_scale_shift = b.u(2);
    if (h.num_cb_points) {
      h.cb_mult = b.u(8);
      h.cb_luma_mult = b.u(8);
      h.cb_offset = b.u(9);
    }
    if (h.num_cr_points) {
      h.cr_mult = b.u(8);
      h.cr_luma_mult = b.u(8);
      h.cr_offset = b.u(9);
    }
    h.overlap_flag = b.u(1);
    h.clip_to_restricted_range = b.u(1);
  };

  // 5.9.31. Temporal point info syntax
  temporal_point_info({ b, h }: { b: BitReader, h: any }) {
    let n = h.frame_presentation_time_length_minus_1 + 1;
    h.frame_presentation_time = b.u(n);
  }

  // 5.10. Frame OBU syntax
  frame_obu(sz: number, { b, h }: { b: BitReader, h: any }) {
    let startBitPos = b.get_position();
    this.frame_header_obu({ b, h });
    b.byte_alignment();
    let endBitPos = b.get_position();
    let headerBytes = (endBitPos - startBitPos) / 8;
    sz = sz - headerBytes;
    this.tile_group_obu(sz, { b, h });
  };

  // 5.11.1. General tile group OBU syntax
  tile_group_obu(sz: number, { b, h }: { b: BitReader, h: any }) {
    h['NumTiles'] = h['TileCols'] * h['TileRows'];
    let startBitPos = b.get_position();
    h.tile_start_and_end_present_flag = 0;
    if (h['NumTiles'] > 1)
      h.tile_start_and_end_present_flag = b.u(1);
    if (h['NumTiles'] == 1 || !h.tile_start_and_end_present_flag) {
      h.tg_start = 0;
      h.tg_end = h['NumTiles'] - 1;
    } else {
      let tileBits = h['TileColsLog2'] + h['TileRowsLog2'];
      h.tg_start = b.u(tileBits);
      h.tg_end = b.u(tileBits);
    }
    b.byte_alignment();
    let endBitPos = b.get_position();
    let headerBytes = (endBitPos - startBitPos) / 8;
    sz -= headerBytes;
    let tileSize = 0;
    for (h['TileNum'] = h.tg_start; h['TileNum'] <= h.tg_end; h['TileNum']++) {
      let tileRow = h['TileNum'] / h['TileCols'];
      let tileCol = h['TileNum'] % h['TileCols'];
      let lastTile = h['TileNum'] == h.tg_end;
      if (lastTile) {
        tileSize = sz;
      } else {
        h.tile_size_minus_1 = b.le(h['TileSizeBytes']);
        tileSize = h.tile_size_minus_1 + 1;
        sz -= tileSize + h['TileSizeBytes'];
      }
      h['MiRowStart'] = h[`MiRowStarts[${tileRow}]`];
      h['MiRowEnd'] = h[`MiRowStarts[${tileRow + 1}]`];
      h['MiColStart'] = h[`MiColStarts[${tileCol}]`];
      h['MiColEnd'] = h[`MiColStarts[${tileCol + 1}]`];
      h['CurrentQIndex'] = h.base_q_idx;
      this.init_symbol(tileSize, { b, h });
      this.decode_tile({ b, h });
      this.exit_symbol({ b, h });
    }
    if (h.tg_end == h['NumTiles'] - 1) {
      if (!h.disable_frame_end_update_cdf) {
        this.frame_end_update_cdf({ b, h });
      }
      this.decode_frame_wrapup({ b, h });
      h.SeenFrameHeader = 0;
    }

  };

  // 5.11.2. Decode tile syntax
  decode_tile({ b, h }: { b: BitReader, h: any }) {
  }

  decode_frame_wrapup({ b, h }: { b: BitReader, h: any }) {

  }

  init_symbol(sz: number, { b, h }: { b: BitReader, h: any }) {
  }

  exit_symbol({ b, h }: { b: BitReader, h: any }) {
  }

  frame_end_update_cdf({ b, h }: { b: BitReader, h: any }) {
  }

  load_grain_params(idx: number, { b, h }: { b: BitReader, h: any },) {

  }

  set_frame_refs({ b, h }: { b: BitReader, h: any }) {

  }

  init_non_coeff_cdfs({ b, h }: { b: BitReader, h: any }) {
  }

  load_cdfs(ctx: number, { b, h }: { b: BitReader, h: any }) {

  }

  motion_field_estimation({ b, h }: { b: BitReader, h: any }) {

  }

  init_coeff_cdfs({ b, h }: { b: BitReader, h: any }) {

  }

  load_previous_segment_ids({ b, h }: { b: BitReader, h: any }) {

  }

  //-?
  setup_past_independence({ b, h }: { b: BitReader, h: any }) {
    for (let ref = LAST_FRAME;
      ref <= ALTREF_FRAME; ++ref) {
      for (let i = 0; i <= 5; ++i) {
        h[`PrevGmParams[${ref}][${i}]`] = (i % 3) == 2 ? 1 << 16 : 8;
      }
    }
  };

  //-?
  load_previous() {
  };

  //-?
  get_qindex(ignoreDeltaQ: number, segmentId: number, { h }: { h: any }) {
    let qindex = h.base_q_idx;
    if (h.segmentation_enabled && h[`FeatureEnabled[${segmentId}][0]`])
      qindex += h[`FeatureData[${segmentId}][0]`];
    return this.Clip3(0, 255, qindex);
  };

  Clip3(low: number, high: number, value: number) {
    return value < low ? low : (value > high ? high : value);
  }

  reset_grain_params({ b, h }: { b: BitReader, h: any }) {
  }

  update_frame_buffers({ h }: { h: any }) {
    if (h.tg_end == undefined || h['TileRows'] == undefined || h['TileCols'] == undefined) return;

    let frameDecodingFinished = h.tg_end == h['TileRows'] * h['TileCols'] - 1;
    if (!frameDecodingFinished) return;

    let refIndex = 0;
    for (let mask = h.refresh_frame_flags; mask; mask = mask >> 1) {
      if (mask & 1) {
        this.RefFrameType[refIndex] = h;
      }
      ++refIndex;
    }
  }
}
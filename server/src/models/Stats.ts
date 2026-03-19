export type RawStats = {
  month: number; // hoặc string (tuỳ DB)
  count: number; // hoặc bigint/string (tuỳ DB)
};

export type RawMonthStats = {
  day: number; // hoặc string (tuỳ DB)
  count: number; // hoặc bigint/string (tuỳ DB)
};

export enum TrackType {
  YEAR = 'year',
  MONTH = 'month',
  QUARTER = 'quarter'
}

export interface GetTrackStatsParams {
  type: TrackType;
  year: number;
  month?: number;
  quarter?: number;
}

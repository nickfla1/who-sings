/**
 * IMPORTANT:
 * This doesn't represent the complete data object but only a subset
 * of properties relevant to the scope of this application.
 * Refer to the official docs for a complete example:
 * https://developer.musixmatch.com/documentation/api-reference/track
 */
export interface TrackApiModel {
  track_id: number;
  track_name: string;
  artist_id: number;
  artist_name: string;
}

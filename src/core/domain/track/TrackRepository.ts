import {Track} from '@core/domain/track/Track';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {TrackLyricsSnippet} from '@core/domain/track/TrackLyricsSnippet';

export interface TrackRepository {
  /**
   * Returns `count` popular tracks with lyrics.
   * @param count How many tracks to return
   */
  popularTracks(count: number): Promise<Track[]>;

  /**
   * Returns `count` popular artists.
   * @param count How many artists to return
   */
  popularArtists(count: number): Promise<TrackArtist[]>;

  /**
   * Returns a snipped of the lyrics of a track.
   */
  trackLyricsSnippet(track: Track): Promise<TrackLyricsSnippet>;
}

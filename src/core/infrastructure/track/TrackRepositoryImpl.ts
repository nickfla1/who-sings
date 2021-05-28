import {LyricsBody} from '@core/domain/track/LyricsBody';
import {Track} from '@core/domain/track/Track';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {TrackLyricsSnippet} from '@core/domain/track/TrackLyricsSnippet';
import {TrackRepository} from '@core/domain/track/TrackRepository';
import {MusixmatchClient} from '@core/infrastructure/musixmatch/MusixmatchClient';

/**
 * Note: Musixmatch APIs use pagination to fetch large lists,
 * which is not currently implemented as we will
 * never fetch a large set of tracks or artists.
 */
export class TrackRepositoryImpl implements TrackRepository {
  constructor(private readonly apiClient: MusixmatchClient) {}

  public async popularTracks(count: number): Promise<Track[]> {
    // Get `count` popular tracks, from the italian leaderboard
    const tracks = await this.apiClient.chartTracksGet(1, count, 'it', true);

    return tracks.map((track) => {
      const artist = new TrackArtist(track.artist_id, track.artist_name);
      return new Track(track.track_id, track.track_name, artist);
    });
  }

  public async popularArtists(count: number): Promise<TrackArtist[]> {
    // Get `count` popular artists, from the italian leaderboard
    const tracks = await this.apiClient.chartArtistsGet(1, count, 'it');

    return tracks.map(
      (artist) => new TrackArtist(artist.artist_id, artist.artist_name),
    );
  }

  public async trackLyricsSnippet(track: Track): Promise<TrackLyricsSnippet> {
    const snippet = await this.apiClient.trackSnippetGet(track.id);

    return new TrackLyricsSnippet(
      LyricsBody.fromString(snippet.snippet_body),
      snippet.script_tracking_url,
    );
  }
}

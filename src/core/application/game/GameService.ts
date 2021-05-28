import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {Track} from '@core/domain/track/Track';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {TrackRepository} from '@core/domain/track/TrackRepository';
import {dateToTs} from '@util/date-util';
import * as _ from 'lodash';

// Corresponds to how much to scale the fetched track subset by
const FETCH_ENTROPY = 3;

export const TRACKS_PER_GAME = 10;
export const CHOICES_PER_TRACK = 3;

export class GameService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly gameRepository: GameRepository,
  ) {}

  public async prepareGameTracks(): Promise<Track[]> {
    // Retrieve random tracks
    const tracks = await this.getRandomPopularTracks(TRACKS_PER_GAME);

    // Retrieve lyrics
    try {
      await Promise.all(
        tracks.map((track) =>
          this.trackRepository.trackLyricsSnippet(track).then((snippet) => {
            track.lyrics = snippet;
          }),
        ),
      );
    } catch (ex) {
      console.warn(ex);
      throw new Error('[GameService] Error retrieving lyrics snippets');
    }

    return tracks;
  }

  public async getTrackChoices(track: Track): Promise<TrackArtist[]> {
    const artists = await this.trackRepository.popularArtists(
      CHOICES_PER_TRACK * FETCH_ENTROPY,
    );

    // Ensures we don't add the track's artist more than once
    const filteredArtists = artists.filter(
      (artist) => artist.id !== track.artist.id,
    );

    // Initialize the choices list with the actual artist
    const sampledArtists = _.sampleSize(filteredArtists, CHOICES_PER_TRACK - 1);

    return _.shuffle([...sampledArtists, track.artist]);
  }

  public prepareTrack(track: Track): void {
    if (track.lyrics) {
      // Note: fetch should be moved to be a dependency of GameService.

      // Invoke the tracking url, just catch the promise.
      // Don't need any return value
      fetch(track.lyrics.trackingUrl).catch();
    }
  }

  public isCorrectArtist(track: Track, artist: TrackArtist): boolean {
    return track.isArtist(artist);
  }

  public finishGame(game: Game): Promise<void> {
    // Set the game finish timestamp
    game.timestamp = dateToTs(new Date());
    return this.gameRepository.saveGame(game);
  }

  private async getRandomPopularTracks(count: number): Promise<Track[]> {
    if (count <= 0) {
      throw new TypeError(
        `[GameService] Invalid argument provided for count: ${count}`,
      );
    }

    let tracks: Track[] | undefined;
    try {
      // Fetch popular tracks
      const popularTracks = await this.trackRepository.popularTracks(
        count * FETCH_ENTROPY,
      );

      // Sample `count` random tracks from the returning array
      tracks = _.sampleSize(popularTracks, count);
    } catch (ex) {
      console.warn(ex);
      throw new Error('[GameService] Error retrieving popular tracks');
    }

    if (!tracks || tracks.length !== count) {
      throw new Error(
        '[GameService] Found tracks does not match the amount required',
      );
    }

    return tracks;
  }
}

import {Track} from '@core/domain/track/Track';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {TrackLyricsSnippet} from '@core/domain/track/TrackLyricsSnippet';
import {TrackRepository} from '@core/domain/track/TrackRepository';
import {ArtistApiModel} from '@core/infrastructure/musixmatch/models/ArtistApiModel';
import {TrackApiModel} from '@core/infrastructure/musixmatch/models/TrackApiModel';
import {MusixmatchClient} from '@core/infrastructure/musixmatch/MusixmatchClient';
import {TrackRepositoryImpl} from '@core/infrastructure/track/TrackRepositoryImpl';
import {mock, mockReset} from 'jest-mock-extended';

describe('TrackRepositoryImpl', () => {
  let repository: TrackRepository;
  const mmClient = mock<MusixmatchClient>();

  beforeEach(() => {
    mockReset(mmClient);
    repository = new TrackRepositoryImpl(mmClient);
  });

  it('should return an array of tracks', async () => {
    mmClient.chartTracksGet.mockImplementation(
      (_, count): Promise<TrackApiModel[]> => {
        return Promise.resolve([
          ...Array(count)
            .fill(0)
            .map(
              (i): TrackApiModel => ({
                track_id: i,
                track_name: 'name',
                artist_id: 1,
                artist_name: 'name',
              }),
            ),
        ]);
      },
    );

    const count = 5;
    const tracks = await repository.popularTracks(count);

    expect(tracks).toHaveLength(count);
    tracks.forEach((track) => expect(track).toBeInstanceOf(Track));
  });

  it('should return an array of artists', async () => {
    mmClient.chartArtistsGet.mockImplementation(
      (_, count): Promise<ArtistApiModel[]> => {
        return Promise.resolve([
          ...Array(count)
            .fill(0)
            .map(
              (i): ArtistApiModel => ({
                artist_id: i,
                artist_name: 'name',
              }),
            ),
        ]);
      },
    );

    const count = 3;
    const artists = await repository.popularArtists(count);

    expect(artists).toHaveLength(count);
    artists.forEach((artist) => expect(artist).toBeInstanceOf(TrackArtist));
  });

  it('should return the lyrics snippet for a track', async () => {
    mmClient.trackSnippetGet.mockReturnValue(
      Promise.resolve({
        snippet_body: '',
        script_tracking_url: '',
      }),
    );

    const snippet = await repository.trackLyricsSnippet(
      new Track(1, 'name', new TrackArtist(1, 'name')),
    );

    expect(snippet).toBeInstanceOf(TrackLyricsSnippet);
  });
});

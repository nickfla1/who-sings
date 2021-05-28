import {
  CHOICES_PER_TRACK,
  GameService,
  TRACKS_PER_GAME,
} from '@core/application/game/GameService';
import {Game} from '@core/domain/game/Game';
import {GameRepository} from '@core/domain/game/GameRepository';
import {LyricsBody} from '@core/domain/track/LyricsBody';
import {Track} from '@core/domain/track/Track';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {TrackLyricsSnippet} from '@core/domain/track/TrackLyricsSnippet';
import {TrackRepository} from '@core/domain/track/TrackRepository';
import {User} from '@core/domain/user/User';
import {mock, mockReset} from 'jest-mock-extended';

describe('GameService', () => {
  let service: GameService;
  const trackRepository = mock<TrackRepository>();
  const gameRepository = mock<GameRepository>();

  beforeEach(() => {
    mockReset(trackRepository);
    mockReset(gameRepository);
    service = new GameService(trackRepository, gameRepository);
  });

  it('should prepare tracks for a game', async () => {
    // Return TRACKS_PER_GAME mocked tracks
    trackRepository.popularTracks.mockReturnValue(
      Promise.resolve([
        ...Array(TRACKS_PER_GAME)
          .fill(0)
          .map(
            (i): Track =>
              new Track(i, `name-${i}`, new TrackArtist(1000 + i, `name-${i}`)),
          ),
      ]),
    );

    trackRepository.trackLyricsSnippet.mockReturnValue(
      Promise.resolve(new TrackLyricsSnippet(LyricsBody.fromString(''), '')),
    );

    const tracks = await service.prepareGameTracks();
    expect(tracks).toHaveLength(TRACKS_PER_GAME);
    tracks.forEach((track) =>
      expect(track.lyrics).toBeInstanceOf(TrackLyricsSnippet),
    );
  });

  it('should get choices for a track', async () => {
    const CORRECT_CHOICE_NAME = 'correct-choice';
    const trackArtist = new TrackArtist(1, CORRECT_CHOICE_NAME);
    const track = new Track(1, 'name', trackArtist);

    // Return CHOICES_PER_TRACK mocked artists
    trackRepository.popularArtists.mockReturnValue(
      Promise.resolve([
        ...Array(CHOICES_PER_TRACK)
          .fill(0)
          .map((i): TrackArtist => new TrackArtist(1000 + i, `name-${i}`)),
      ]),
    );

    const choices = await service.getTrackChoices(track);
    expect(choices).toHaveLength(CHOICES_PER_TRACK);
    expect(choices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({name: CORRECT_CHOICE_NAME}),
      ]),
    );
  });

  it('should finish the game', async () => {
    const game = new Game(new User('user'));
    await service.finishGame(game);

    expect(game.timestamp).toBeDefined();
    expect(gameRepository.saveGame).toBeCalledTimes(1);
    expect(gameRepository.saveGame).toBeCalledWith(game);
  });
});

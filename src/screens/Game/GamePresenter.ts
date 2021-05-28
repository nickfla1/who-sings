import {GameService} from '@core/application/game/GameService';
import {Game} from '@core/domain/game/Game';
import {Track} from '@core/domain/track/Track';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {UserRepository} from '@core/domain/user/UserRepository';
import {GameRepositoryImpl} from '@core/infrastructure/game/GameRepositoryImpl';
import {MusixmatchClient} from '@core/infrastructure/musixmatch/MusixmatchClient';
import {TrackRepositoryImpl} from '@core/infrastructure/track/TrackRepositoryImpl';
import {UserRepositoryImpl} from '@core/infrastructure/user/UserRepositoryImpl';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Time (in milliseconds) to wait between tracks transitions.
 * It's not required but fast methods and APIs can lead to
 * flashy and unpleasant UI transitions.
 */
const WAIT_BETWEEN_TRACKS_MS = 500;

export interface GameScreen {
  /**
   * Invoked before starting loading the music tracks
   * that will be used in this game instance.
   */
  onLoadingTracks(): void;

  /**
   * Invoked once the presenter has finished loading the tracks.
   */
  onLoadingTracksFinished(totalTracks: number): void;

  /**
   * Invoked when the presenter is loading the next track.
   */
  onLoadingNextTrack(): void;

  /**
   * Invoked every time the screen needs to show a new track.
   */
  onNextTrack(track: Track, trackNumber: number, choices: TrackArtist[]): void;

  /**
   * Invoked when the current game has finished.
   */
  onGameFinished(score: number): void;

  /**
   * Invoked by the presenter every time an error
   * occurs and we want to notify the user.
   */
  onError(error: Error | string): void;
}

export class GamePresenter {
  // noinspection TypeScriptFieldCanBeMadeReadonly
  private tracks: Track[] | null;
  private game: Game | null;
  private currentTrackIndex: number;
  private readonly gameService: GameService;
  private readonly userRepository: UserRepository;

  constructor(private readonly screen: GameScreen) {
    // const trackRepository = new InMemoryTrackRepositoryImpl();
    const apiService = new MusixmatchClient();
    const trackRepository = new TrackRepositoryImpl(apiService);
    const gameRepository = new GameRepositoryImpl(AsyncStorage);
    this.gameService = new GameService(trackRepository, gameRepository);

    this.game = null;
    this.tracks = null;
    this.currentTrackIndex = -1;
    this.userRepository = new UserRepositoryImpl(AsyncStorage);
  }

  public onLoadGame(): void {
    // Instantiate game object
    this.userRepository
      .getLoggedUser()
      .then((user) => {
        if (!user) {
          throw new Error('Cannot start a game if the user a not logged in');
        }
        this.game = new Game(user);
      })
      .catch(this.screen.onError);

    // Load tracks
    this.screen.onLoadingTracks();
    this.gameService
      .prepareGameTracks()
      .then((tracks) => {
        this.tracks = tracks;
        this.screen.onLoadingTracksFinished(this.tracks.length);
      })
      .catch(this.screen.onError);
  }

  public requestNextTrack(): Promise<void> {
    if (this.currentTrackIndex >= this.tracks!.length - 1) {
      return this.finishGame();
    }

    const trackIndex = ++this.currentTrackIndex;
    const track = this.tracks![trackIndex];

    this.gameService.prepareTrack(track);

    return this.gameService
      .getTrackChoices(track)
      .then((choices) => {
        this.screen.onLoadingNextTrack();
        setTimeout(() => {
          this.screen.onNextTrack(track, trackIndex + 1, choices);
        }, WAIT_BETWEEN_TRACKS_MS);
      })
      .catch(this.screen.onError);
  }

  public onChoose(track: Track, choice: TrackArtist): void {
    const isCorrectAnswer = this.gameService.isCorrectArtist(track, choice);
    if (isCorrectAnswer) {
      this.game!.incrementScore();
    }

    this.requestNextTrack();
  }

  private finishGame(): Promise<void> {
    this.screen.onGameFinished(this.game!.score);
    return this.gameService.finishGame(this.game!).catch(this.screen.onError);
  }
}

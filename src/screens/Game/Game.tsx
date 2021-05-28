import {Track} from '@core/domain/track/Track';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {ErrorView} from '@screens/Game/ErrorView';
import {FinishView} from '@screens/Game/FinishView';
import {GamePresenter, GameScreen} from '@screens/Game/GamePresenter';
import {LoadingView} from '@screens/Game/LoadingView';
import {LyricsView} from '@screens/Game/LyricsView';
import {Screen} from '@screens/Screen';
import {Colors} from '@ui/colors';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {
  NavigationComponent,
  NavigationComponentProps,
  Options,
} from 'react-native-navigation';

interface Props extends NavigationComponentProps {}

interface State {
  score: number;
  error: boolean;
  loading: boolean;
  loadingTrack: boolean;
  finished: boolean;
  currentTrack: Track | null;
  currentTrackChoices: TrackArtist[] | null;
  currentTrackNumber: number;
  totalTracks: number;
}

export class Game
  extends NavigationComponent<Props, State>
  implements GameScreen {
  private readonly presenter: GamePresenter;

  constructor(props: Props) {
    super(props);

    this.presenter = new GamePresenter(this);

    this.state = {
      score: 0,
      error: false,
      loading: true,
      loadingTrack: true,
      finished: false,
      currentTrack: null,
      currentTrackChoices: null,
      currentTrackNumber: 0,
      totalTracks: 0,
    };
  }

  public componentDidMount(): void {
    this.presenter.onLoadGame();
  }

  public onLoadingTracks = (): void => {
    this.setState({loading: true});
  };

  public onLoadingTracksFinished = (totalTracks: number): void => {
    this.setState({totalTracks}, () => {
      this.presenter.requestNextTrack();
    });
  };

  public onLoadingNextTrack = (): void => {
    this.setState({loadingTrack: true});
  };

  public onNextTrack = (
    track: Track,
    trackNumber: number,
    choices: TrackArtist[],
  ): void => {
    this.setState({
      loading: false,
      loadingTrack: false,
      currentTrack: track,
      currentTrackNumber: trackNumber,
      currentTrackChoices: choices,
    });
  };

  public onGameFinished = (score: number): void => {
    this.setState({finished: true, score});
  };

  public onError = (error: Error | string): void => {
    console.warn(error);
    // Set error flag and "reset" state
    this.setState({
      error: true,
      loading: false,
      loadingTrack: false,
      currentTrack: null,
      currentTrackChoices: null,
    });
  };

  private requestNextTrack = (): void => {
    this.presenter.requestNextTrack();
  };

  private onChoose = (choice: TrackArtist): void => {
    if (!this.state.currentTrack) {
      return;
    }
    this.presenter.onChoose(this.state.currentTrack, choice);
  };

  public render(): React.ReactNode {
    const {
      score,
      error,
      loading,
      finished,
      totalTracks,
      currentTrack,
      loadingTrack,
      currentTrackNumber,
      currentTrackChoices,
    } = this.state;

    const shouldRenderLyricsView =
      !error &&
      !loading &&
      !finished &&
      !loadingTrack &&
      currentTrack &&
      currentTrackChoices;

    return (
      <Screen style={Style.containerBg} contentContainerStyle={Style.container}>
        {/* Loading view */}
        {loading && <LoadingView />}
        {!loading && loadingTrack && (
          <ActivityIndicator color={Colors.white} size={'large'} />
        )}
        {error && <ErrorView />}
        {shouldRenderLyricsView && (
          <LyricsView
            lyrics={currentTrack!.lyrics!}
            trackNumber={currentTrackNumber}
            totalTracks={totalTracks}
            choices={currentTrackChoices!}
            onChoose={this.onChoose}
            onSkip={this.requestNextTrack}
            onTimeOut={this.requestNextTrack}
          />
        )}
        {finished && <FinishView score={score} />}
      </Screen>
    );
  }

  static options: Options = {
    statusBar: {
      style: 'light' as const,
    },
  };
}

const Style = StyleSheet.create({
  containerBg: {
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

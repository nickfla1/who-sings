import {LoadingView} from '@components/common/LoadingView';
import {GameRow} from '@components/screens/ranking';
import {Game} from '@core/domain/game/Game';
import {
  RankingPresenter,
  RankingScreen,
} from '@screens/Ranking/RankingPresenter';
import {Screen} from '@screens/Screen';
import {HugeText, NormalText} from '@ui';
import {Colors} from '@ui/colors';
import React from 'react';
import {Alert, FlatList, ListRenderItem} from 'react-native';
import {
  Navigation,
  NavigationComponent,
  NavigationComponentProps,
  Options,
} from 'react-native-navigation';
import {ScaledSheet} from 'react-native-size-matters';

interface Props extends NavigationComponentProps {}

interface State {
  games: Game[] | null;
  loading: boolean;
}

export class Ranking
  extends NavigationComponent<Props, State>
  implements RankingScreen {
  private presenter: RankingPresenter;

  constructor(props: Props) {
    super(props);

    this.presenter = new RankingPresenter(this);

    this.state = {
      games: null,
      loading: true,
    };
  }

  public componentDidMount(): void {
    this.presenter.load();
  }

  public onLoading = (): void => {
    this.setState({loading: true});
  };

  public onLoadingFinished = (games: Game[]): void => {
    this.setState({
      games,
      loading: false,
    });
  };

  public onError = (error: Error | string): void => {
    console.warn(error);
    // Alert the user and return to the previous screen
    Alert.alert('Ops!', 'An error has occurred, please retry');
    Navigation.pop(this.props.componentId);
  };

  private renderGameRow: ListRenderItem<Game> = ({item, index}) => (
    <GameRow rank={index + 1} game={item} />
  );

  private renderEmptyList = (): React.ReactElement => (
    <NormalText thin>No game as ever been played.</NormalText>
  );

  private gameRowKeyExtractor = (item: any, index: number): string =>
    `${index}`;

  public render(): React.ReactNode {
    const {games} = this.state;

    return (
      <Screen contentContainerStyle={Style.container}>
        {this.state.loading && <LoadingView color={Colors.primary} />}
        {!this.state.loading && (
          <>
            <HugeText style={Style.title} bold colorPrimary>
              Ranking
            </HugeText>
            <FlatList
              data={games}
              keyExtractor={this.gameRowKeyExtractor}
              renderItem={this.renderGameRow}
              ListEmptyComponent={this.renderEmptyList()}
            />
          </>
        )}
      </Screen>
    );
  }

  static options: Options = {
    topBar: {
      leftButtons: [],
      rightButtons: [],
      backButton: {
        visible: true,
        title: 'Back',
        showTitle: true,
        color: Colors.primary,
      },
    },
  };
}

const Style = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: '20@vs',
  },
  title: {
    marginBottom: '10@vs',
  },
});

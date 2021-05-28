import {LoadingView} from '@components/common/LoadingView';
import {Header} from '@components/screens/profile';
import {GameRow} from '@components/screens/profile/GameRow';
import {Game} from '@core/domain/game/Game';
import {User} from '@core/domain/user/User';
import {GuestNavigator} from '@navigation/guest-navigator';
import {
  ProfilePresenter,
  ProfileScreen,
} from '@screens/Profile/ProfilePresenter';
import {Screen} from '@screens/Screen';
import {LargeText, NormalText} from '@ui';
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
  user: User | null;
  games: Game[] | null;
  loading: boolean;
}

export class Profile
  extends NavigationComponent<Props, State>
  implements ProfileScreen {
  private presenter: ProfilePresenter;

  constructor(props: Props) {
    super(props);

    this.presenter = new ProfilePresenter(this);

    this.state = {
      user: null,
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

  public onLoadingFinished = (user: User, games: Game[]): void => {
    this.setState({
      user,
      games,
      loading: false,
    });
  };

  public onLogout = (): void => {
    // Reset navigation root
    GuestNavigator();
  };

  public onError = (error: Error | string): void => {
    console.warn(error);
    // Alert the user and return to the previous screen
    Alert.alert('Ops!', 'An error has occurred, please retry');
    Navigation.pop(this.props.componentId);
  };

  private logout = (): void => {
    this.presenter.logout();
  };

  private renderGameRow: ListRenderItem<Game> = ({item}) => (
    <GameRow game={item} />
  );

  private renderEmptyList = (): React.ReactElement => (
    <NormalText thin>You didn't play any game yet.</NormalText>
  );

  private gameRowKeyExtractor = (item: any, index: number): string =>
    `${index}`;

  public render(): React.ReactNode {
    const {user, games} = this.state;

    return (
      <Screen contentContainerStyle={Style.container}>
        {this.state.loading && <LoadingView color={Colors.primary} />}
        {!this.state.loading && (
          <>
            <Header name={user!.name} onLogout={this.logout} />
            <LargeText style={Style.title} bold>
              Last games
            </LargeText>
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
  // items
  title: {
    marginBottom: '10@vs',
  },
});

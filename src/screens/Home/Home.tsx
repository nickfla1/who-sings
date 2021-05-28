import {LoadingView} from '@components/common/LoadingView';
import {User} from '@core/domain/user/User';
import {GameNavigator} from '@navigation/game-navigator';
import {HomePresenter, HomeScreen} from '@screens/Home/HomePresenter';
import {Screen} from '@screens/Screen';
import {HugeText, LargeText, PrimaryButton} from '@ui';
import {Colors} from '@ui/colors';
import React from 'react';
import {Alert, Image, View} from 'react-native';
import {
  NavigationComponent,
  NavigationComponentProps,
} from 'react-native-navigation';
import {ScaledSheet} from 'react-native-size-matters';

interface Props extends NavigationComponentProps {}

interface State {
  user: User | null;
  loading: boolean;
}

export class Home
  extends NavigationComponent<Props, State>
  implements HomeScreen {
  private presenter: HomePresenter;

  constructor(props: Props) {
    super(props);

    this.presenter = new HomePresenter(this);

    this.state = {
      user: null,
      loading: true,
    };
  }

  public componentDidMount(): void {
    this.presenter.load();
  }

  public onLoading = (): void => {
    this.setState({loading: true});
  };

  public onLoadingFinished = (user: User): void => {
    this.setState({
      user,
      loading: false,
    });
  };

  public onError = (error: Error | string): void => {
    console.warn(error);
    Alert.alert(
      'Ops!',
      'There was an error loading the current logged in user. Please retry.',
    );
  };

  private onStartGame = (): void => {
    GameNavigator();
  };

  public render(): React.ReactNode {
    const {user, loading} = this.state;

    return (
      <Screen>
        {loading && (
          <View style={Style.loadingContainer}>
            <LoadingView color={Colors.primary} />
          </View>
        )}
        {!loading && user && (
          <View style={Style.container}>
            <View style={Style.titleContainer}>
              <HugeText style={Style.title} colorPrimary bold italic>
                Who Sings
              </HugeText>
            </View>
            <View style={Style.heading}>
              <Image
                style={Style.image}
                source={require('../../../assets/images/home-image.png')}
              />
              <LargeText style={Style.welcomeBack}>
                {/* eslint-disable-next-line */}
                Welcome back <LargeText bold colorPrimary>{user!.name}</LargeText>!
              </LargeText>
            </View>

            <View style={Style.footer}>
              <PrimaryButton onPress={this.onStartGame}>
                Start game
              </PrimaryButton>
            </View>
          </View>
        )}
      </Screen>
    );
  }
}

const Style = ScaledSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 0.2,
  },
  heading: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '50@vs',
  },
  footer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: '40@vs',
  },
  image: {
    width: '250@s',
    height: '250@s',
  },
  welcomeBack: {
    marginTop: '20@vs',
  },
  title: {
    marginTop: '40@vs',
    textAlign: 'center',
  },
});

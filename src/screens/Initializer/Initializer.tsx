import {AppNavigator} from '@navigation/app-navigator';
import {GuestNavigator} from '@navigation/guest-navigator';
import {
  InitializerPresenter,
  InitializerScreen,
} from '@screens/Initializer/InitializerPresenter';
import {HugeText} from '@ui';
import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  NavigationComponent,
  NavigationComponentProps,
} from 'react-native-navigation';
import {Screen} from '../Screen';

interface Props extends NavigationComponentProps {}

export class Initializer
  extends NavigationComponent<Props>
  implements InitializerScreen {
  private presenter: InitializerPresenter;

  constructor(props: Props) {
    super(props);

    this.presenter = new InitializerPresenter(this);
  }

  public componentDidMount(): void {
    this.presenter.load();
  }

  public onLoadingFinished = (isLoggedIn: boolean): void => {
    if (isLoggedIn) {
      AppNavigator();
    } else {
      GuestNavigator();
    }
  };

  public onError = (error: Error | string): void => {
    console.warn(error);
    Alert.alert('Ops!', 'Could not initialize the application. Please retry.');
  };

  public render(): React.ReactNode {
    // Display a splash screen while waiting for the initialization process to end
    return (
      <Screen contentContainerStyle={Style.container}>
        <HugeText bold italic colorPrimary>
          Who Sings
        </HugeText>
      </Screen>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

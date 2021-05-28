import {AppNavigator} from '@navigation/app-navigator';
import {
  RegisterPresenter,
  RegisterScreen,
} from '@screens/Register/RegisterPresenter';
import {
  NavigationComponent,
  NavigationComponentProps,
} from 'react-native-navigation';
import {HugeText, PrimaryButton, TextInput} from '@ui';
import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, View} from 'react-native';
import {Screen} from '../Screen';
import {ScaledSheet} from 'react-native-size-matters';

interface Props extends NavigationComponentProps {}

interface State {
  name: string;
}

export class Register
  extends NavigationComponent<Props, State>
  implements RegisterScreen {
  private presenter: RegisterPresenter;

  constructor(props: Props) {
    super(props);

    this.presenter = new RegisterPresenter(this);

    this.state = {
      name: '',
    };
  }

  public onUserRegistered = (): void => {
    // Reset the navigation stack
    AppNavigator();
  };

  public onError = (error: Error | string): void => {
    console.warn(error);
    Alert.alert(
      'Ops!',
      'There was an error trying to register your user. Please retry.',
    );
  };

  private onSubmit = (): void => {
    this.presenter.registerUserWithName(this.state.name);
  };

  private onNameTextChange = (text: string): void => {
    this.setState({
      name: text,
    });
  };

  public render(): React.ReactNode {
    return (
      <Screen contentContainerStyle={Style.container}>
        <KeyboardAvoidingView
          style={Style.avoidingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={Style.innerContainer}>
            <HugeText style={Style.title} bold italic colorPrimary>
              Who Sings
            </HugeText>
            <View style={Style.inputContainer}>
              <TextInput
                label={'Enter your name to play'}
                placeholder={'Enter your name'}
                onChangeText={this.onNameTextChange}
                value={this.state.name}
                autoCorrect={false}
              />
            </View>
            <PrimaryButton onPress={this.onSubmit}>Start playing</PrimaryButton>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    );
  }
}

const Style = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  avoidingContainer: {
    flex: 1,
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '40@vs',
  },
  inputContainer: {
    marginBottom: '20@vs',
  },
});

import {AppNavigator} from '@navigation/app-navigator';
import {GameNavigator} from '@navigation/game-navigator';
import {HugeText, MediumText, WhiteButton} from '@ui';
import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export const ErrorView: FC = () => (
  <View style={Style.container}>
    <HugeText style={Style.title} bold colorWhite>
      Ops! :(
    </HugeText>
    <MediumText style={Style.errorText} colorWhite>
      An unexpected error has occurred.
    </MediumText>
    <View style={Style.retryButtonContainer}>
      <WhiteButton
        onPress={
          (): any => GameNavigator() /* Just reset the navigation root */
        }>
        Retry
      </WhiteButton>
    </View>
    <View style={Style.homeButtonContainer}>
      <WhiteButton
        onPress={
          (): any => AppNavigator() /* Just reset the navigation root */
        }>
        Home page
      </WhiteButton>
    </View>
  </View>
);

const Style = ScaledSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginTop: '20@vs',
  },
  retryButtonContainer: {
    marginTop: '80@vs',
  },
  homeButtonContainer: {
    marginTop: '20@vs',
  },
});

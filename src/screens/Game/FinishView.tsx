import {AppNavigator} from '@navigation/app-navigator';
import {HugeText, LargeText, MediumText, WhiteButton} from '@ui';
import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  score: number;
}

export const FinishView: FC<Props> = ({score}) => (
  <View style={Style.container}>
    {score > 0 && (
      <>
        <HugeText bold colorWhite style={Style.text}>
          Well done!
        </HugeText>
        <MediumText colorWhite style={[Style.text, Style.infoText]}>
          {/* eslint-disable-next-line */}
          You scored <LargeText bold colorWhite>{score}</LargeText> points!
        </MediumText>
      </>
    )}
    {score <= 0 && (
      <>
        <HugeText bold colorWhite style={Style.text}>
          Don't worry!
        </HugeText>
        <HugeText bold colorWhite style={Style.text}>
          Maybe next time!
        </HugeText>
        <MediumText colorWhite style={[Style.text, Style.infoText]}>
          You haven't guessed any correct artist
        </MediumText>
      </>
    )}
    <View style={Style.retryButtonContainer}>
      <WhiteButton onPress={(): any => AppNavigator()}>Home page</WhiteButton>
    </View>
  </View>
);

const Style = ScaledSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  infoText: {
    marginTop: '20@vs',
  },
  retryButtonContainer: {
    marginTop: '60@vs',
  },
});

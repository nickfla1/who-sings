import {TrackLyricsSnippet} from '@core/domain/track/TrackLyricsSnippet';
import {SECONDS_PER_TRACK} from '@screens/Game/constants';
import {Timer} from './Timer';
import {LargeText, NormalText} from '@ui';
import {Colors} from '@ui/colors';
import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  lyrics: TrackLyricsSnippet;
  trackNumber: number;
  totalTracks: number;
  onTimeOut: () => void;
}

export const LyricsCard: FC<Props> = ({
  lyrics,
  trackNumber,
  totalTracks,
  onTimeOut,
}) => (
  <View style={Style.card}>
    {lyrics.body.lines.map((line) => (
      <LargeText key={line} style={Style.lyrics}>
        {line}
      </LargeText>
    ))}
    <View style={Style.countContainer}>
      <NormalText>
        {trackNumber}
        <NormalText thin>/{totalTracks}</NormalText>
      </NormalText>
    </View>
    <View style={Style.timerContainer}>
      <Timer duration={SECONDS_PER_TRACK} onFinish={onTimeOut} />
    </View>
  </View>
);

const Style = ScaledSheet.create({
  card: {
    width: '100%',
    height: '250@vs',
    backgroundColor: Colors.white,
    borderRadius: '30@vs',
    padding: '20@vs',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lyrics: {
    textAlign: 'center',
  },
  timerContainer: {
    position: 'absolute',
    right: '20@vs',
    bottom: '20@vs',
  },
  countContainer: {
    position: 'absolute',
    left: '20@vs',
    bottom: '20@vs',
  },
});

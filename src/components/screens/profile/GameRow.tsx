import {Game} from '@core/domain/game/Game';
import {NormalText, SmallText} from '@ui';
import {formatDate, tsToDate} from '@util/date-util';
import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  game: Game;
}

export const GameRow: FC<Props> = ({game}) => (
  <View style={Style.item}>
    <SmallText thin>
      Score: <NormalText colorPrimary>{game.score}</NormalText>
    </SmallText>
    <SmallText thin>
      {/* eslint-disable-next-line */}
      Played at: <NormalText colorPrimary>{formatDate(tsToDate(game.timestamp!))}</NormalText>
    </SmallText>
  </View>
);

const Style = ScaledSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '5@vs',
  },
});

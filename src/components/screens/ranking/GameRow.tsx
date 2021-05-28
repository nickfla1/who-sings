import {Game} from '@core/domain/game/Game';
import {MediumText, NormalText, SmallText} from '@ui';
import {Colors} from '@ui/colors';
import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  rank: number;
  game: Game;
}

export const GameRow: FC<Props> = ({rank, game}) => (
  <View style={Style.item}>
    <View style={Style.rankContainer}>
      <MediumText bold colorWhite>
        {rank}
      </MediumText>
    </View>
    <SmallText thin>
      Score: <NormalText colorPrimary>{game.score}</NormalText>
    </SmallText>
    <SmallText thin>
      By: <NormalText colorPrimary>{game.user.name}</NormalText>
    </SmallText>
  </View>
);

const Style = ScaledSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '10@vs',
  },
  rankContainer: {
    backgroundColor: Colors.primary,
    width: '30@vs',
    height: '30@vs',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15@vs',
  },
});

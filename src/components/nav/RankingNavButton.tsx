import {NavButton} from '@components/nav/NavButton';
import {SCREEN_HOME, SCREEN_RANKING} from '@navigation/routes';
import React, {FC} from 'react';
import {Navigation} from 'react-native-navigation';

export const RankingNavButton: FC = () => (
  <NavButton
    icon={require('../../../assets/images/icon-ranking.png')}
    onPress={(): void => {
      Navigation.push(SCREEN_HOME, {
        component: {
          name: SCREEN_RANKING,
        },
      });
    }}
  />
);

import {NavButton} from '@components/nav/NavButton';
import {SCREEN_HOME, SCREEN_PROFILE} from '@navigation/routes';
import React, {FC} from 'react';
import {Navigation} from 'react-native-navigation';

export const ProfileNavButton: FC = () => (
  <NavButton
    icon={require('../../../assets/images/icon-user.png')}
    onPress={(): void => {
      Navigation.push(SCREEN_HOME, {
        component: {
          name: SCREEN_PROFILE,
        },
      });
    }}
  />
);

import {Navigation, OptionsTopBarButton} from 'react-native-navigation';
import {
  COMPONENT_NAV_PROFILE,
  COMPONENT_NAV_RANKING,
  SCREEN_HOME,
} from './routes';

const ProfileButton: OptionsTopBarButton = {
  id: 'profile-btn',
  component: {
    name: COMPONENT_NAV_PROFILE,
  },
};

const RankingButton: OptionsTopBarButton = {
  id: 'ranking-btn',
  component: {
    name: COMPONENT_NAV_RANKING,
  },
};

export const AppNavigator = async (): Promise<void> => {
  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: SCREEN_HOME,
              name: SCREEN_HOME,
              options: {
                topBar: {
                  visible: true,
                  leftButtons: [ProfileButton],
                  rightButtons: [RankingButton],
                },
              },
            },
          },
        ],
        options: {
          statusBar: {
            visible: true,
            style: 'dark',
          },
        },
      },
    },
  });
};

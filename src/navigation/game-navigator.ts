import {Navigation} from 'react-native-navigation';
import {SCREEN_GAME} from './routes';

export const GameNavigator = async (): Promise<void> => {
  await Navigation.setRoot({
    root: {
      component: {
        name: SCREEN_GAME,
        options: {
          statusBar: {
            visible: true,
          },
        },
      },
    },
  });
};

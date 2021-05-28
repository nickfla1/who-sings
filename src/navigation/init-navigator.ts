import {Navigation} from 'react-native-navigation';
import {SCREEN_INIT} from './routes';

export const InitNavigator = async (): Promise<void> => {
  await Navigation.setRoot({
    root: {
      component: {
        name: SCREEN_INIT,
        options: {
          statusBar: {
            visible: true,
          },
        },
      },
    },
  });
};

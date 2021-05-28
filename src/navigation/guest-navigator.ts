import {Navigation} from 'react-native-navigation';
import {SCREEN_REGISTER} from './routes';

export const GuestNavigator = async (): Promise<void> => {
  await Navigation.setRoot({
    root: {
      component: {
        name: SCREEN_REGISTER,
        options: {
          statusBar: {
            visible: false,
          },
        },
      },
    },
  });
};

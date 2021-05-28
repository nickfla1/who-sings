import {InitNavigator} from '@navigation/init-navigator';
import {Navigation} from 'react-native-navigation';
import {registerComponents} from '@navigation/register-components';

registerComponents();

Navigation.events().registerAppLaunchedListener(() => {
  InitNavigator();
});

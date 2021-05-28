import {ProfileNavButton, RankingNavButton} from '@components/nav';
import {
  COMPONENT_NAV_PROFILE,
  COMPONENT_NAV_RANKING,
  SCREEN_GAME,
  SCREEN_HOME,
  SCREEN_INIT,
  SCREEN_PROFILE,
  SCREEN_RANKING,
  SCREEN_REGISTER,
} from '@navigation/routes';
import {Game} from '@screens/Game/Game';
import {Home} from '@screens/Home/Home';
import {Initializer} from '@screens/Initializer/Initializer';
import {Profile} from '@screens/Profile/Profile';
import {Ranking} from '@screens/Ranking/Ranking';
import {Register} from '@screens/Register/Register';
import {Navigation} from 'react-native-navigation';

export const registerComponents = (): void => {
  Navigation.registerComponent(SCREEN_INIT, () => Initializer);
  Navigation.registerComponent(SCREEN_HOME, () => Home);
  Navigation.registerComponent(SCREEN_GAME, () => Game);
  Navigation.registerComponent(SCREEN_PROFILE, () => Profile);
  Navigation.registerComponent(SCREEN_RANKING, () => Ranking);
  Navigation.registerComponent(SCREEN_REGISTER, () => Register);
  Navigation.registerComponent(COMPONENT_NAV_PROFILE, () => ProfileNavButton);
  Navigation.registerComponent(COMPONENT_NAV_RANKING, () => RankingNavButton);
};

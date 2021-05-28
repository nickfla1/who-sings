import React, {FC} from 'react';
import {
  Image,
  Platform,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props extends TouchableOpacityProps {
  icon: ImageSourcePropType;
}

export const NavButton: FC<Props> = ({icon, ...rest}) => (
  <TouchableOpacity
    {...rest}
    style={[Style.container, Platform.OS === 'android' && Style.padding]}>
    <Image style={Style.icon} source={icon} />
  </TouchableOpacity>
);

const Style = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '30@vs',
    height: '30@vs',
  },
  padding: {
    paddingHorizontal: '20@vs',
  },
});

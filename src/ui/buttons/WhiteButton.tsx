import {Colors} from '@ui/colors';
import {MediumText} from '@ui/texts';
import React, {FC} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export const WhiteButton: FC<TouchableOpacityProps> = ({children, ...rest}) => (
  <TouchableOpacity activeOpacity={0.6} style={Style.button} {...rest}>
    <MediumText bold>{children}</MediumText>
  </TouchableOpacity>
);

const Style = ScaledSheet.create({
  button: {
    height: '60@s',
    borderRadius: '30@s',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

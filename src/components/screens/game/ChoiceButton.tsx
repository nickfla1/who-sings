import {Colors} from '@ui/colors';
import {MediumText} from '@ui/texts';
import React, {FC} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export const ChoiceButton: FC<TouchableOpacityProps> = ({
  children,
  ...rest
}) => (
  <TouchableOpacity activeOpacity={0.6} style={Style.button} {...rest}>
    <MediumText numberOfLines={1} ellipsizeMode={'tail'} colorWhite bold>
      {children}
    </MediumText>
  </TouchableOpacity>
);

const Style = ScaledSheet.create({
  button: {
    height: '60@s',
    borderRadius: '30@s',
    borderWidth: '2@vs',
    backgroundColor: Colors.darkPrimary,
    borderColor: Colors.darkerPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: '20@vs',
  },
});

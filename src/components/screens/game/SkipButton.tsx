import {LargeText} from '@ui';
import React, {FC} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export const SkipButton: FC<TouchableOpacityProps> = (props) => (
  <TouchableOpacity {...props}>
    <LargeText style={Style.skip} thin italic>
      Skip
    </LargeText>
  </TouchableOpacity>
);

const Style = ScaledSheet.create({
  skip: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  center?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Container: FC<Props> = ({center, style, children}) => (
  <View style={[Style.container, style, center && Style.center]}>
    {children}
  </View>
);

const Style = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '20@vs',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

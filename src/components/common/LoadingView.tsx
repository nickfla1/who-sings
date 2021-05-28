import React, {FC} from 'react';
import {ActivityIndicator, ColorValue, StyleSheet, View} from 'react-native';

interface Props {
  color: ColorValue;
}

export const LoadingView: FC<Props> = ({color}) => (
  <View style={Style.container}>
    <ActivityIndicator size={'large'} color={color} />
  </View>
);

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import {Container} from '@ui';
import {Colors} from '@ui/colors';
import React, {FC} from 'react';
import {SafeAreaView, StyleProp, StyleSheet, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const Screen: FC<Props> = ({style, contentContainerStyle, children}) => (
  <SafeAreaView style={[Style.safeArea, style]}>
    <Container style={contentContainerStyle}>{children}</Container>
  </SafeAreaView>
);

const Style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

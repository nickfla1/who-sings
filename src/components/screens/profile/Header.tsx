import {HugeText, NormalText} from '@ui';
import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  name: string;
  onLogout: () => void;
}

export const Header: FC<Props> = ({name, onLogout}) => (
  <>
    <HugeText bold colorPrimary>
      Profile
    </HugeText>
    <View style={Style.header}>
      <View style={Style.infoContainer}>
        <NormalText bold>
          {/* eslint-disable-next-line */}
          Name: <NormalText bold colorPrimary>{name}</NormalText>
        </NormalText>
      </View>
      <View style={Style.logoutContainer}>
        <NormalText onPress={onLogout} bold italic>
          Log out
        </NormalText>
      </View>
    </View>
  </>
);

const Style = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: '20@vs',
    marginBottom: '10@vs',
  },
  infoContainer: {
    flex: 1,
  },
  logoutContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

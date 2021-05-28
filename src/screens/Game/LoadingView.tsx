import {HugeText, NormalText} from '@ui';
import React, {FC} from 'react';
import {ScaledSheet} from 'react-native-size-matters';

export const LoadingView: FC = () => (
  <>
    <HugeText style={Style.title} colorWhite bold uppercase>
      Your game will start soon
    </HugeText>
    <NormalText style={Style.loadingText} colorWhite italic>
      Loading most trending songs
    </NormalText>
  </>
);

const Style = ScaledSheet.create({
  title: {
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: '40@vs',
  },
});

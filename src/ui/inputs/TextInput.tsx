import {Colors} from '@ui/colors';
import {NormalText} from '@ui/texts';
import React, {FC} from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props extends TextInputProps {
  label?: string;
}

export const TextInput: FC<Props> = ({label, ...rest}) => (
  <>
    <NormalText style={Style.label} thin>
      {label}
    </NormalText>
    <RNTextInput
      style={Style.input}
      placeholderTextColor={Colors.gray}
      {...rest}
    />
  </>
);

const Style = ScaledSheet.create({
  input: {
    height: '60@s',
    borderRadius: '30@s',
    borderColor: Colors.primary,
    borderWidth: '2@vs',
    paddingHorizontal: '20@vs',
    fontWeight: '700',
    fontSize: '16@s',
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  label: {
    marginLeft: '30@vs',
    marginBottom: '5@vs',
  },
});

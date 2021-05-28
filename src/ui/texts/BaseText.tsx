import {Colors} from '@ui/colors';
import React, {FC} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

export interface BaseTextProps extends TextProps {
  bold?: boolean;
  thin?: boolean;

  italic?: boolean;

  uppercase?: boolean;
  lowercase?: boolean;

  colorPrimary?: boolean;
  colorSecondary?: boolean;
  colorBlack?: boolean;
  colorWhite?: boolean;
}

const styleFromProps = (props: BaseTextProps): TextStyle => {
  const style: TextStyle = {};

  if (props.bold) {
    style.fontWeight = 'bold';
  } else if (props.thin) {
    style.fontWeight = '200';
  } else {
    style.fontWeight = 'normal';
  }

  if (props.italic) {
    style.fontStyle = 'italic';
  }

  if (props.uppercase) {
    style.textTransform = 'uppercase';
  } else if (props.lowercase) {
    style.textTransform = 'lowercase';
  }

  if (props.colorPrimary) {
    style.color = Colors.primary;
  } else if (props.colorSecondary) {
    style.color = Colors.secondary;
  } else if (props.colorWhite) {
    style.color = Colors.white;
  } else {
    style.color = Colors.black;
  }

  return style;
};

interface Props extends BaseTextProps {
  size: number;
}

export const BaseText: FC<Props> = ({size, children, ...rest}) => {
  const style = styleFromProps(rest);
  style.fontSize = size;

  return (
    <Text {...rest} style={[style, rest.style && rest.style]}>
      {children}
    </Text>
  );
};

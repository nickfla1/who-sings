import React, {FC} from 'react';
import {BaseText, BaseTextProps} from './BaseText';

export const LargeText: FC<BaseTextProps> = (props) => (
  <BaseText size={28} {...props} />
);

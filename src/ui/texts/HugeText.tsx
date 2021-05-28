import React, {FC} from 'react';
import {BaseText, BaseTextProps} from './BaseText';

export const HugeText: FC<BaseTextProps> = (props) => (
  <BaseText size={42} {...props} />
);

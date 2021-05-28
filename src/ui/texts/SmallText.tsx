import React, {FC} from 'react';
import {BaseText, BaseTextProps} from './BaseText';

export const SmallText: FC<BaseTextProps> = (props) => (
  <BaseText size={14} {...props} />
);

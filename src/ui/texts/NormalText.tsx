import React, {FC} from 'react';
import {BaseText, BaseTextProps} from './BaseText';

export const NormalText: FC<BaseTextProps> = (props) => (
  <BaseText size={16} {...props} />
);

import React, {FC} from 'react';
import {BaseText, BaseTextProps} from './BaseText';

export const MediumText: FC<BaseTextProps> = (props) => (
  <BaseText size={22} {...props} />
);

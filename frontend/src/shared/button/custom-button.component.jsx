import React from 'react';

import {
    CustomizedButton,
    ButtonText
} from './custom-button.styles';

const CustomButton = ({ label, style }) => (
  <CustomizedButton className={style}>
    <ButtonText>{label}</ButtonText>
  </CustomizedButton>
);

export default CustomButton;

import React from 'react';

import {
    CustomizedButton,
    ButtonText
} from './custom-button.styles';

const CustomButton = ({ label, buttonStyle }) => (
  <CustomizedButton className={buttonStyle}>
    <ButtonText>{label}</ButtonText>
  </CustomizedButton>
);

export default CustomButton;

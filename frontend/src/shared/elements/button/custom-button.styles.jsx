import styled from 'styled-components';


export const CustomizedButton = styled.button`
  color:  rgb(85, 0, 195);
  border: none;
  border-radius: 0;
  font-size: 16px;

  &:hover {
    transform: scale(0.95);
  }

  &:focus {
    transform: scale(0.88);
  }

  &.round {
    border-radius: 10px;
  }

  &.blue {
    background-color:  rgb(70, 181, 255);
  }

  &.green {
    background-color: rgb(39, 194, 39);
  }

  &.orange {
    background-color: #e27800;
  }

  &.yellow {
    background-color: #ffd900;
  }

  &.red {
    background-color: rgb(200, 0, 0);
  }

  @media (max-width: 400px) {
    font-size: 4vw;
  }
`;

CustomizedButton.displayName = 'CustomizedButton';

export const ButtonText = styled.h5`
  color:  rgb(62, 0, 143);
  margin: 10px 10px 10px 10px
`;

ButtonText.displayName = 'ButtonText'
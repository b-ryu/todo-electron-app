import React from 'react';

import { ModalContainer, ModalTitle, ModalButtons, ModalButton } from './ModalComponents';

export default ({ message, onCancel, onConfirm }) => (
  <ModalContainer>
    <ModalTitle small>{message}</ModalTitle>
    <ModalButtons>
      <ModalButton onClick={onConfirm}>confirm</ModalButton>
      <ModalButton onClick={onCancel} color="black">cancel</ModalButton>
    </ModalButtons>
  </ModalContainer>
);
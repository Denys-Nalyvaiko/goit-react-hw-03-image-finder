import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 90dvh;
  transform: translate(-50%, -50%);
  background-color: transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1200;
`;

export const CloseButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  background-color: transparent;
  padding: 6px;
  border: 2px solid #252525;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 200ms ease-in-out 50ms;

  &:hover {
    background-color: #fafafa;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1199;
`;

import { Component } from 'react';
import { CloseButton, ModalContainer, Overlay } from './Modal.styled';

const ESC = 'Escape';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyClose);
  }

  handleKeyClose = event => {
    event.code === ESC && this.props.onClose();
  };

  render() {
    const { largeImageURL, tags, onClose } = this.props;

    return (
      <>
        <ModalContainer>
          <CloseButton type="button" onClick={onClose}>
            Close
          </CloseButton>
          <img src={largeImageURL} alt={tags} width="750" />
        </ModalContainer>
        <Overlay onClick={onClose} />
      </>
    );
  }
}

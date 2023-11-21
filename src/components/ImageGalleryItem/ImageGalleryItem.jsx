import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

import {
  ImageGalleryItemContainer,
  ImageGalleryItemSource,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalHidden: true,
  };

  handleOpenImageModal = () => {
    this.setState({ isModalHidden: false });
  };

  handleCloseImageModal = () => {
    this.setState({ isModalHidden: true });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalHidden } = this.state;

    return (
      <>
        <ImageGalleryItemContainer onClick={this.handleOpenImageModal}>
          <ImageGalleryItemSource src={webformatURL} alt={tags} />
        </ImageGalleryItemContainer>
        {!isModalHidden && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.handleCloseImageModal}
          />
        )}
      </>
    );
  }
}

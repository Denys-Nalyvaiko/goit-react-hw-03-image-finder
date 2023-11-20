import {
  ImageGalleryItemContainer,
  ImageGalleryItemSource,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => (
  <ImageGalleryItemContainer>
    <ImageGalleryItemSource src={webformatURL} alt={tags} />
  </ImageGalleryItemContainer>
);

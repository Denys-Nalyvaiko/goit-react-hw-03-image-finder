import { Component } from 'react';
import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImageGallery } from 'api/fetchImageGallery';
import { LoadMoreButton } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
  };

  page = 1;

  handleQueryFormSubmit = async query => {
    this.setState({ query });
    const { hits } = await fetchImageGallery(query, this.page);
    this.setState({
      images: hits,
    });
  };

  handleLoadMoreBtnClick = async () => {
    this.page += 1;
    const { hits } = await fetchImageGallery(this.state.query, this.page);
    this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
  };

  render() {
    const { images } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleQueryFormSubmit} />
        {Boolean(images.length) && <ImageGallery images={images} />}
        <LoadMoreButton onClick={this.handleLoadMoreBtnClick} />
      </Container>
    );
  }
}

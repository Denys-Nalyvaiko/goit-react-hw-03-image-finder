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
  perPage = 12;
  isHidden = true;

  handleQueryFormSubmit = async query => {
    this.page = 1;

    try {
      this.setState({ query });
      const { hits, totalHits } = await fetchImageGallery(
        query,
        this.page,
        this.perPage
      );
      this.setState({
        images: hits,
      });

      if (this.page * this.perPage < totalHits) {
        this.isHidden = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleLoadMoreBtnClick = async () => {
    this.page += 1;

    try {
      const { hits, totalHits } = await fetchImageGallery(
        this.state.query,
        this.page,
        this.perPage
      );

      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));

      if (this.page * this.perPage > totalHits) {
        this.isHidden = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { images } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleQueryFormSubmit} />
        {Boolean(images.length) && <ImageGallery images={images} />}
        {!this.isHidden && (
          <LoadMoreButton onClick={this.handleLoadMoreBtnClick} />
        )}
      </Container>
    );
  }
}

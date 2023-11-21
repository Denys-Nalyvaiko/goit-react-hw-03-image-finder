import { Component } from 'react';
import { Notify } from 'notiflix';
import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImageGallery } from 'api/fetchImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
  };

  page = 1;
  perPage = 12;
  isButtonHidden = true;

  handleQueryFormSubmit = async query => {
    if (query.trim() === '') {
      Notify.warning('You should enter your search query');
      return;
    }

    this.page = 1;
    this.setState({ query });
    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await fetchImageGallery(
        query,
        this.page,
        this.perPage
      );

      this.searchImageGallery(hits, totalHits);
    } catch (error) {
      Notify.failure(`Failure: ${error.message}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMoreBtnClick = async () => {
    this.page += 1;
    this.isButtonHidden = true;

    try {
      const { hits, totalHits } = await fetchImageGallery(
        this.state.query,
        this.page,
        this.perPage
      );

      this.increaseImageList(hits, totalHits);
    } catch (error) {
      Notify.failure(`Failure: ${error.message}`);
    }
  };

  searchImageGallery = (hits, totalHits) => {
    this.setState({
      images: hits,
    });
    this.isButtonHidden = false;

    if (this.page * this.perPage > totalHits) {
      this.isButtonHidden = true;
    }
  };

  increaseImageList = (hits, totalHits) => {
    this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
    this.isButtonHidden = false;

    if (this.page * this.perPage > totalHits) {
      this.isButtonHidden = true;
    }
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleQueryFormSubmit} />
        {isLoading && <Loader />}
        {Boolean(images.length) && !isLoading && (
          <ImageGallery images={images} />
        )}
        {!this.isButtonHidden && !isLoading && (
          <LoadMoreButton onClick={this.handleLoadMoreBtnClick} />
        )}
      </Container>
    );
  }
}

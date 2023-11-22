import { Component } from 'react';
import { Notify } from 'notiflix';
import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImageGallery, PER_PAGE } from 'api/fetchImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    isButtonHidden: true,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      if (page === 1) {
        this.setState({ isLoading: true });
      }

      this.processImageGallery(query, page);
    }
  }

  handleQueryFormSubmit = async query => {
    if (query.trim() === '') {
      Notify.warning('You should enter your search query');
      return;
    }

    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMoreBtnClick = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  processImageGallery = async (query, page) => {
    try {
      const { hits, totalHits } = await fetchImageGallery(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isButtonHidden: false,
      }));

      if (page * PER_PAGE > totalHits) {
        this.setState({ isButtonHidden: true });
      }
    } catch (error) {
      Notify.failure(`Failure: ${error.message}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, isButtonHidden } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleQueryFormSubmit} />
        {isLoading && <Loader />}
        {Boolean(images.length) && !isLoading && (
          <ImageGallery images={images} />
        )}
        {!isButtonHidden && !isLoading && (
          <LoadMoreButton onClick={this.handleLoadMoreBtnClick} />
        )}
      </Container>
    );
  }
}

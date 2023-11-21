import { Component } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImageGallery } from 'api/fetchImageGallery';
import { LoadMoreButton } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
  };

  page = 1;
  perPage = 12;
  isButtonHidden = true;

  componentDidUpdate(_, prevState) {
    prevState.query !== this.state.query && this.setState({ isLoading: true });

    prevState.images !== this.state.images &&
      this.page === 1 &&
      this.setState({ isLoading: false });
  }

  handleQueryFormSubmit = async query => {
    this.page = 1;
    this.setState({ query });

    try {
      const { hits, totalHits } = await fetchImageGallery(
        query,
        this.page,
        this.perPage
      );

      this.setState({
        images: hits,
      });

      this.isButtonHidden = false;

      if (this.page * this.perPage > totalHits) {
        this.isButtonHidden = true;
      }
    } catch (error) {
      console.log(error);
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

      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
      this.isButtonHidden = false;

      if (this.page * this.perPage > totalHits) {
        this.isButtonHidden = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleQueryFormSubmit} />
        {isLoading && (
          <CirclesWithBar
            height="100"
            width="100"
            color="#3f51b5"
            wrapperStyle={{ margin: '24px auto 0' }}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        )}
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

import { Component } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchbarHeader,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputQueryChange = event => {
    this.setState({ query: event.target.value });
  };

  handleQueryFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleQueryFormSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputQueryChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

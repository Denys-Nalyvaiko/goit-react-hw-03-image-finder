import { Component } from 'react';
import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  render() {
    return (
      <Container>
        <Searchbar />
      </Container>
    );
  }
}

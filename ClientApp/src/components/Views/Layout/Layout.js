import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Layout.css';


export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="allContainer">
        <Header />
        <Container>
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
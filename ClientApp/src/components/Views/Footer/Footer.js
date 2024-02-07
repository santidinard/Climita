import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import './Footer.css';


export class Footer extends Component {
  static displayName = Footer.name;

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow footerComplete" container light>
            <span className="legalText">Copyright 2024 - TODOS LOS DERECHOS RESERVADOS | Climita</span>
            <span className="brand">Santiago Dinard</span>
        </Navbar>
      </header>
    );
  }
}
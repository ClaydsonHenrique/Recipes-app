import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';

class Receitas extends Component {
  render() {
    return (
      <div>
        <div>Receitas</div>
        <Footer />
      </div>
    );
  }
}

export default connect()(Receitas);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';

class Drinks extends Component {
  render() {
    return (
      <div>
        <div>Drinks</div>
        <Footer />
      </div>
    );
  }
}

export default connect()(Drinks);

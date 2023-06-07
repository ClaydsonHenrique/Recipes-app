import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';

class Profile extends Component {
  render() {
    return (
      <div>
        <div>Profile</div>
        <Footer />
      </div>
    );
  }
}

export default connect()(Profile);

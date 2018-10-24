import React from 'react';
import axios from 'axios';
const { key } = require('../../secrets');
import Photos from './Photos';
import Loading from './Flickr';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=$architecture&per_page=16&format=json&nojsoncallback=1`
      )
      .then(results => {
        this.setState({
          photos: results.data.photos.photo,
          loading: false,
        });
      })
      .catch(error => {
        console.log('Error fetching data', error);
      });
  }
  render() {
    if (this.state.loading) {
      console.log('LOADING');
      return null;
      <span>{Loading}</span>;
    } else {
      return <Photos photos={this.state.photos} />;
    }
  }
}

export default Home;

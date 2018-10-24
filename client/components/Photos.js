import React from 'react';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(direction) {
    if (direction === 'back') {
      this.setState(prevState => ({
        page: prevState.page - 1,
      }));
    } else {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    }
  }

  render() {
    let self = this;
    let currentPhotos = Paginator(this.props.photos, this.state.page, 10);
    let allPhotos = currentPhotos.data.map(photo => {
      const url =
        'https://farm' +
        photo.farm +
        '.staticflickr.com/' +
        photo.server +
        '/' +
        photo.id +
        '_' +
        photo.secret +
        '.jpg';
      return (
        <li key={photo.id} id="myImg">
          <img
            src={url}
            onClick={function() {
              let modalImg = document.getElementById('modalImage');
              let captionText = document.getElementById('caption');
              modalImg.src = url;
              captionText.innerHTML = photo.title;
              open();
            }}
          />
        </li>
      );
    });
    return (
      <div>
        <div>
          <h1>ARCHITECTURE GALLERY</h1>
          <ul>{allPhotos}</ul>
        </div>
        <div id="myModal">
          <span
            className="close"
            onClick={function() {
              open();
            }}
          >
            &times;
          </span>
          <img id="modalImage" className="modal-content" />
          <div id="caption" />
        </div>
        <button
          onClick={function() {
            self.handlePageChange('back');
          }}
        >
          BACK
        </button>
        <button
          onClick={function() {
            self.handlePageChange('next');
          }}
        >
          NEXT
        </button>
      </div>
    );
  }
}

const open = () => {
  let elem = document.getElementById('myModal');
  elem.style.visibility =
    elem.style.visibility == 'visible' ? 'hidden' : 'visible';
};

const Paginator = (items, page, per_page) => {
  var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
};

export default Photos;

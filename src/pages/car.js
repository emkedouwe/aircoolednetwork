import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {WP_SITE_URL, WP_API} from '../constants/constants';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Car extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      isOpen: false,
      index: 0
    };

    this.openLightbox = this.openLightbox.bind(this);
  }

  componentWillMount() {
    let slug = this.props.match.params.slug;

    fetch(WP_SITE_URL + WP_API + "car?slug=" + slug)
    .then(response => response.json())
    .then(response => {
      this.setState({
        loaded: true,
        car: response[0]
      })
    })
  }

  openLightbox(index) {
    console.log(index);
    this.setState({ index: index, isOpen: true });
  }

  render() {
    const { isOpen } = this.state;

    if (this.state.loaded) {
      const car = this.state.car;

      return (
        <div className="Car">

          <Helmet>
            <title>{car.title.rendered}</title>
          </Helmet>
          
          <div className="container my-3">

            <div className="mb-2">
              <span onClick={() => this.props.history.goBack()}>&laquo; Back</span>
            </div>

            <h1 className="mb-0" dangerouslySetInnerHTML={{__html: `${car.title.rendered}`}}></h1>
            <h4>&euro; {car.acf.car_price}</h4>

            <div className="row">
              <div className="col-sm-6">

                <div className="mb-0" dangerouslySetInnerHTML={{__html: `${car.content.rendered}`}}></div>

                <ul className="list-group my-3">
                  <li className="list-group-item">
                      <div>
                        <h6 className="my-0">Brand</h6>
                        <small className="text-muted">{car.acf.car_brand}</small>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div>
                        <h6 className="my-0">Model</h6>
                        <small className="text-muted">{car.acf.car_model}</small>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div>
                        <h6 className="my-0">Engine Type</h6>
                        <small className="text-muted">{car.acf.car_engine_type}</small>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div>
                        <h6 className="my-0">Construction Year</h6>
                        <small className="text-muted">{car.acf.car_construction_year}</small>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div>
                        <h6 className="my-0">License Plate</h6>
                        <small className="text-muted">{car.acf.car_license_plate}</small>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div>
                        <h6 className="my-0">Colour</h6>
                        <small className="text-muted">{car.acf.car_colour}</small>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div>
                        <h6 className="my-0">Chassis Number</h6>
                        <small className="text-muted">{car.acf.car_chassis_number}</small>
                      </div>
                  </li>
                </ul>

              </div>
              <div className="col-sm-6">
                
                <div className="car-gallery d-flex flex-wrap">

                  {car.acf.car_images.map((image,index) =>
                    <div className="col-6 mb-3" key={image.id} >
                      <a type="button" onClick={() => this.openLightbox(index)}>
                        <img src={image.sizes.medium} className="img-fluid" alt="" />
                      </a>
                    </div>
                  )}
                  
                </div>

                {isOpen && (
                  <Lightbox
                    mainSrc={car.acf.car_images[this.state.index].sizes.large}
                    nextSrc={car.acf.car_images[(this.state.index + 1) % car.acf.car_images.length].sizes.large}
                    prevSrc={car.acf.car_images[(this.state.index + car.acf.car_images.length - 1) % car.acf.car_images.length].sizes.large}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        index: (this.state.index + car.acf.car_images.length - 1) % car.acf.car_images.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        index: (this.state.index + 1) % car.acf.car_images.length,
                      })
                    }
                  />
                )}

              </div>
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div id="loader"></div>
      );
    }
  }
}

export default Car;
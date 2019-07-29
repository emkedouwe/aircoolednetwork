import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {WP_SITE_URL, WP_API} from '../constants/constants';

class Car extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    let slug = this.props.params.slug;

    fetch(WP_SITE_URL + WP_API + "car?slug=" + slug)
    .then(response => response.json())
    .then(response => {
      this.setState({
        loaded: true,
        car: response[0]
      })
    })
  }

  render() {
    if (this.state.loaded) {
      const car = this.state.car;

      return (
        <div className="Car">

          <Helmet>
            <title>{car.title.rendered}</title>
          </Helmet>
          
          <div className="container my-3">

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

                  {car.acf.car_images.map(image =>
                    <div className="col-6 mb-3" key={image.id} >
                      <a href={image.url}>
                        <img src={image.sizes.medium} className="img-fluid" alt="" />
                      </a>
                    </div>
                  )}

                  
                </div>

              </div>
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default Car;
import React, { Component } from 'react';
import { Link } from 'react-router';

class CarTeaser extends Component {

	render() {

		return (
			<div className="col-6 col-sm-4">	
				<div className="card bg-light mb-4">
					{this.props.car.acf.car_images[0]
	  			&& (		
						<img className="card-img-top" src={this.props.car.acf.car_images[0].sizes.medium} alt={this.props.car.title.rendered} />
					)}
					<div className="card-body">
						<h3 dangerouslySetInnerHTML={{__html: `${this.props.car.title.rendered}`}}></h3>

						<div className="row">
							<div className="col-6">
								<h4>&euro; {this.props.car.acf.car_price}</h4>
							</div>
							<div className="col-6">
								<img src="http://dev.nl/aircoolednetwork/wp-content/themes/aircoolednetwork/assets/images/logo-kombi-kings.png" alt="" className="img-fluid" />
							</div>
						</div>

						<Link to={"/car/" + this.props.car.slug} className="stretched-link">&nbsp;</Link>
					</div>
				</div>
			</div>
		);
	}
};

export default CarTeaser;
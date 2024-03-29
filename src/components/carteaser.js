import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarTeaser extends Component {

	render() {
		return (
			<div className="col-12 col-sm-4">	
				<div className="card bg-light mb-4 car teaser">
					{this.props.car.acf.car_images
	  			&& (		
						<img className="card-img-top" src={this.props.car.acf.car_images[0].sizes.medium} alt={this.props.car.title.rendered} />
					)}
	  				<div className="bg-secondary p-2 condition">
	  					{this.props.car._embedded && this.props.car._embedded['wp:term']
					  	&& (
					  		this.props.car._embedded['wp:term'][0].map((term) => {
					  			if(term.taxonomy === "condition") {
					  				return <span key={term.id} className="badge badge-outline-light">{term.name}</span>
					  			}
					  			return null;
					  		})
					  	)}
						
					</div>
					<div className="card-body">

						<h3 dangerouslySetInnerHTML={{__html: `${this.props.car.title.rendered}`}}></h3>
						<h5>By {this.props.car.author_name}</h5>

						<div className="row">
							<div className="col-6">
								<h4>&euro; {this.props.car.acf.car_price}</h4>
							</div>
							{this.props.car._embedded.author[0].acf.user_logo.sizes.large
							&& (
								<div className="col-6">
									<img src={this.props.car._embedded.author[0].acf.user_logo.sizes.large} alt={this.props.car.author_name} className="img-fluid" />
								</div>
							)}
						</div>

						<Link to={"/car/" + this.props.car.slug} className="stretched-link">&nbsp;</Link>
					</div>
				</div>
			</div>
		);
	}
};

export default CarTeaser;
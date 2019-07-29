import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link } from 'react-router';
import * as Actions from '../actions/actions';

import logo from './../images/logo.svg';
import iconSearch from './../images/icon-search.svg';

class Home extends Component {

  handleChange(name, event) {
    const newFilter = this.props.reducerCars.filter;

    if(event.target.checked === true) {
      newFilter.push(name);
    } else {
      let index = newFilter.indexOf(name);
      newFilter.splice(index, 1);
    }
    
    this.props.actions.setfilter(newFilter);
  }

  render() {

    const {reducerCars} = this.props;
    const {filter} = reducerCars;

    return (
      <div className="home">

        <div className="container text-center">

          <img src={logo} alt="Aircooled Network" class="my-5" />

          <h1 className="text-white mb-4">Explore the Aircooled Network</h1>

          <div className="container mb-5">
            <div className="row">
              <div className="col-2 offset-2">
                <div className="bg-white">
                  <FormControlLabel
                    control={
                      <Switch checked={filter.indexOf(3) > -1} value="3" onChange={this.handleChange.bind(this,3)} color="primary" />
                    }
                    labelPlacement="start"
                    label="Original"
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="bg-white">
                  <FormControlLabel
                    control={
                      <Switch checked={filter.indexOf(4) > -1} value="4" onChange={this.handleChange.bind(this,4)} color="primary" />
                    }
                    labelPlacement="start"
                    label="Custom"
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="bg-white">
                  <FormControlLabel
                    control={
                      <Switch checked={filter.indexOf(5) > -1} value="5" onChange={this.handleChange.bind(this,5)} color="primary" />
                    }
                    labelPlacement="start"
                    label="Renovate"
                  />
                </div>
              </div>
              <div className="col-2">
                <Link to="/cars">
                  <button type="button" className="btn btn-primary btn-block h-100"><img src={iconSearch} width="20" alt="Search" /></button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {reducerCars} = state;
  return {
    reducerCars
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
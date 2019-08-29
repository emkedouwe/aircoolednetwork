import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import * as Actions from '../actions/actions';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Helmet } from "react-helmet";

import CarTeaser from './../components/carteaser.js';
import Pagination from './../components/pagination.js';

class Cars extends Component{

  constructor(props) {
    super(props);
    
    const {getCars} = props.actions
    getCars(props.match.params.page, props.reducerCars.filter)

    this.handlePagination = this.handlePagination.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.match.params.page !== nextProps.match.params.page) {
      const {getCars} = nextProps.actions
      getCars(nextProps.match.params.page, this.props.reducerCars.filter)
    }
  }

  handleChange(name, event) {
    const newFilter = this.props.reducerCars.filter;

    if(event.target.checked === true) {
      newFilter.push(name);
    } else {
      let index = newFilter.indexOf(name);
      newFilter.splice(index, 1);
    }
    
    this.props.actions.filter(newFilter);
  }

  handlePagination(pageNumber) {
    this.props.history.push('/cars/' + pageNumber);
  }

  render() {
    
    const {reducerCars} = this.props;
    const {currentPage, noOfPages, isLoading, filter} = reducerCars;

    if (isLoading) {
      return (
        <div id="loader"></div>
      )
    } else {
      return (
        <div className="Cars">
          <Helmet>
            <title>Explore the Aircooled Network</title>
          </Helmet>
          <div className="container py-3">
            <FormGroup aria-label="position" name="position" row>
              <FormControlLabel
                control={
                  <Switch checked={filter.indexOf(3) > -1} value="3" onChange={this.handleChange.bind(this,3)} color="primary" />
                }
                labelPlacement="start"
                label="Original"
              />
              <FormControlLabel
                control={
                  <Switch checked={filter.indexOf(4) > -1} value="4" onChange={this.handleChange.bind(this,4)} color="primary" />
                }
                labelPlacement="start"
                label="Custom"
              />
              <FormControlLabel
                control={
                  <Switch checked={filter.indexOf(5) > -1} value="5" onChange={this.handleChange.bind(this,5)} color="primary" />
                }
                labelPlacement="start"
                label="Renovate"
              />
            </FormGroup>
          </div>
          <div className="container my-3">
            <TransitionGroup className="row">
              {reducerCars.cars.map((car) => {
                return (
                  <CSSTransition
                    key={car.id}
                    timeout={0}
                    classNames="item"
                  >
                    <CarTeaser key={car.id} car={car} />
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
            <div className="container">
              <Pagination
                total={parseInt(noOfPages)}
                current={parseInt(currentPage)}
                prevText="Prev"
                showPages={true}
                nextText="Next"
                onClickPage={this.handlePagination}
                baseClassName="pagination justify-content-center"
              />
            </div>
          </div>
        </div>
      );
    }
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
)(Cars);
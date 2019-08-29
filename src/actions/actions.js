import {
  REQUEST_CARS, CARS_LOADED, TOTAL_PAGES_FOR_CARS, CAR_FILTER,
  REQUEST_LATEST_CARS, CARS_LATEST_LOADED,
  REQUEST_FORM_SUBMIT, REQUEST_FORM_MESSAGE,
  WP_SITE_URL, WP_API, POSTS_PER_PAGE
} from '../constants/constants';

// Actions om overzicht op te halen
function requestCars(currentPage, loading){
  return{
    type: REQUEST_CARS,
    currentPage: currentPage,
    loading: loading
  }
}

function noOfPagesforCars(totalPages){
  return{
    type: TOTAL_PAGES_FOR_CARS,
    noOfPages: totalPages
  }
}

export function setfilter(filter) {
  return{
    type: CAR_FILTER,
    filter: filter
  }
}

export function filter(filter) {
  return (dispatch, getState) => {
    dispatch({ type: CAR_FILTER, filter: filter });

    const state = getState();

    dispatch(getCars(state.reducerCars.currentPage, filter));
  };
}

export function getCars(currentPage, filter) {
  return function(dispatch) {
    dispatch(requestCars(currentPage, true));

    let filter_url = "";

    filter.map(value => {
      return filter_url = filter_url + "&condition[]="+value;
    });

    return fetch(WP_SITE_URL + WP_API + "car?per_page= " + POSTS_PER_PAGE + "&page=" + currentPage + filter_url + "&_embed")
      .then(function(response){
        dispatch(noOfPagesforCars(response.headers.get('X-WP-TotalPages')));
        return response.json();
      })
      .then(json => {
        dispatch({ type: CARS_LOADED, payload: json });
      });
  };
}

// Actions om laatste auto' op te halen
function requestLatestCars(loading){
  return{
    type: REQUEST_LATEST_CARS,
    loading: loading
  }
}

export function getLatestCars() {
  return function(dispatch) {
    dispatch(requestLatestCars(true));

    return fetch(WP_SITE_URL + WP_API + "car?per_page=3&orderby=date&order=desc&_embed")
      .then(function(response){
        return response.json();
      })
      .then(json => {
        dispatch({ type: CARS_LATEST_LOADED, payload: json });
      });
  };
}

// Actions om formulieren te versturen
function requestFormSubmit(sending){
  return{
    type: REQUEST_FORM_SUBMIT,
    sending: sending
  }
}

export function sendContact( formData ) {
  return function(dispatch) {
    dispatch(requestFormSubmit(true));

    return fetch(WP_SITE_URL + "/wp-json/contact-form-7/v1/contact-forms/62/feedback", {
      method: 'POST',
      body: formData,
    })
    .then(function(response){
      return response.json();
    })
    .then(json => {
      dispatch({ type: REQUEST_FORM_MESSAGE, payload: json });
    });

    //formData.forEach(entries => console.log(entries));
  }
}
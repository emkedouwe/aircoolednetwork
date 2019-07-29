import {
  REQUEST_CARS, CARS_LOADED, TOTAL_PAGES_FOR_CARS, CAR_FILTER,
  WP_SITE_URL, WP_API, POSTS_PER_PAGE
} from '../constants/constants';

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
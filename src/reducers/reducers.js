import {combineReducers} from 'redux';
import {
  REQUEST_CARS, CARS_LOADED, TOTAL_PAGES_FOR_CARS, CAR_FILTER,
  REQUEST_LATEST_CARS, CARS_LATEST_LOADED
} from '../constants/constants';

function reducerCars(state = {cars:[], isLoading: true, currentPage: 0, noOfPages: 0, filter: []}, action){
  
  if (action.type === REQUEST_CARS) {
    return Object.assign({}, state, {
      currentPage : action.currentPage,
      isLoading: action.loading
    });
  }

  if (action.type === CARS_LOADED) {
    return Object.assign({}, state, {
      cars: action.payload,
      isLoading: false
    });
  }

  if (action.type === TOTAL_PAGES_FOR_CARS) {
    return Object.assign({}, state, {
      noOfPages: action.noOfPages
    });
  }

  if (action.type === CAR_FILTER) {
    return Object.assign({}, state, {
      filter: action.filter
    });
  }

  return state;
}

function reducerLatestCars(state = {cars:[], isLoading: true}, action) {
  
  if (action.type === REQUEST_LATEST_CARS) {
    return Object.assign({}, state, {
      currentPage : action.currentPage,
      isLoading: action.loading
    });
  }

  if (action.type === CARS_LATEST_LOADED) {
    return Object.assign({}, state, {
      cars: action.payload,
      isLoading: false
    });
  }

  return state;
}

const reducer = combineReducers({
  reducerCars,
  reducerLatestCars
});

export default reducer;
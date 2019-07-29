import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import {Provider} from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk'
import reducer from "./reducers/reducers";
import { Router, IndexRoute, Route, Redirect } from 'react-router';
import App from './layouts/default';
import Home from './pages/home';
import Cars from './pages/Cars';
import Car from './pages/car';

const initialState = {
}

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
  storeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
	    <Route path="/" component={App}>
		    <IndexRoute component={Home} />
		    <Route path="/cars/:page" component={Cars} />
		    <Redirect from='/cars' to='cars/1'/>
		    <Route path="/car/:slug" component={Car} />
		  </Route>
		</Router>
	</Provider>
	,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
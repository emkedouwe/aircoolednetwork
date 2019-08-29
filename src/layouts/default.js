import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './../components/header.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './../styles/vendor.scss';
import './../styles/main.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#1AB7EB',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
  },
});

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="app">
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...matchProps} />
        </ThemeProvider>
      </div>
    )} />
  )
};


export default DefaultLayout;
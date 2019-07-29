import React, { Component } from 'react';
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

class Default extends Component {
  render() {
    return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <Header />
          {this.props.children}
        </ThemeProvider>
      </div>
    );
  }
}

export default Default;
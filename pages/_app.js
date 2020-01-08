import App from "next/app";
import React from 'react';
import withReduxStore from '../lib/redux-store';
import { Provider } from 'react-redux';
import { GlobalStyle } from '../containers/GlobalStyles';


class _App extends App {
  render() {
    const {Component, pageProps, reduxStore} = this.props;
    return(
        <Provider store={reduxStore}>
        <GlobalStyle/>
          <Component {...pageProps} />
        </Provider>
    )
  }
}

export default withReduxStore(_App);
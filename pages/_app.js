import App from "next/app";
import React from 'react';
import withReduxStore from '../lib/redux-store';
import {Provider} from 'react-redux';
import {GlobalStyle} from '../containers/GlobalStyles';
import {ModalProvider} from 'styled-react-modal'
import {theme} from "../containers/theme";
import {MuiThemeProvider} from "@material-ui/core/styles";

class _App extends App {
    render() {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={reduxStore}>
                    <ModalProvider>
                        <GlobalStyle/>
                        <Component {...pageProps} />
                    </ModalProvider>
                </Provider>
            </MuiThemeProvider>
        )
    }
}

export default withReduxStore(_App);
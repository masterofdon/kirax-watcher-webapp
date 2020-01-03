import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/routes/app/_helpers';
import { Provider } from 'react-redux';
import ClientMainApp from './routes/app/components/ClientMainApp';

ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            <ClientMainApp />
        </Provider>
    </BrowserRouter>
), document.getElementById('root'))

document.getElementById("spinner").setAttribute("style" , "display : none");
document.getElementsByTagName('body')[0].setAttribute("style" , "background-color : white");

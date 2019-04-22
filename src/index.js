import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import BookDetails from './BookDetails'
import NavBar from './NavBar'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <>
        <Router>
            <NavBar/>
            <Redirect from="/" to="/search" component={App} />
            <Route exact path="/" component={App} />
            <Route path="/book/:bookId" component={BookDetails} />
        </Router>
    </>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

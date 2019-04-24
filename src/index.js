import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import BookDetails from './BookDetails'
import BookShelf from './BookShelf'
import NavBar from './NavBar'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <Router>
            <NavBar/>
            <Switch>
                <Redirect exact from="/" to="/search" component={App} />
                <Route path="/search" component={App} />
                <Route path="/book/:bookId" component={BookDetails} />
                <Route path="/bookshelf" component={BookShelf} />
            </Switch>
        </Router>
    )
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

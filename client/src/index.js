import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import authReducer from './store/reducers/auth';
import weatherReducer from './store/reducers/weather';
import proposalReducer from './store/reducers/proposal';
import 'bootstrap/dist/css/bootstrap.min.css';  // to be weppacked!


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    weather: weatherReducer,
    proposal: proposalReducer,
    auth: authReducer
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );

serviceWorker.unregister();

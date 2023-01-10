import { createStore, applyMiddleware } from 'redux';
//import thunk for doing asynchronous operations in redux
import thunk from 'redux-thunk';

import rootReducer from '../reducers';


export default store = createStore(rootReducer,applyMiddleware(thunk));
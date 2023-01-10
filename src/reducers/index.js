import { combineReducers } from 'redux';
import app from './app';
import currency from './currency';
import strings from './strings';
import user from './user';

import loading from './loading';
import listing from './listing';
import booking from './booking';
import filter from './filter';
import listings from './listings';
import site from './site';
import chat from './chat';

export default combineReducers({
    app,
	site,
	currency,
	strings,
	user,
  	loading,
  	listing,
  	booking,
  	filter,
  	listings,
  	chat,
});
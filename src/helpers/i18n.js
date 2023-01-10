import React from "react";
import {
  I18nManager
} from "react-native";

// import * as RNLocalize from "react-native-localize";
// import * as Localization from 'expo-localization';
import I18n from "i18n-js";
// import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

import en from "../locales/en";
import fr from "../locales/fr";
import tr from "../locales/tr";
import cn from "../locales/cn";
import pt from "../locales/pt";
import es from "../locales/es";
import jp from "../locales/jp";
import pl from "../locales/pl";
import ru from "../locales/ru";
import it from "../locales/it";
import de from "../locales/de";
import vi from "../locales/vi";
import my from "../locales/my";
import ar from "../locales/ar";

import store from '../store';

// https://medium.com/@nicolas.kovacs/react-native-localize-and-i18n-js-117f09428017
/*
const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  	I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  	en,
  	fr
};

export default I18n;
*/
// https://medium.com/better-programming/creating-a-multi-language-app-in-react-native-9828b138c274

const translationGetters = {
  	// lazy requires (metro bundler does not support symlinks)
  	en: en,
  	fr: fr,
  	tr: tr,
  	cn: cn,
  	pt: pt,
  	es: es,
  	jp: jp,
  	pl: pl,
  	ru: ru,
  	it: it,
  	de: de,
  	vi: vi,
  	my: my,
	ar: ar,
};

// export const translate = memoize(
//   	(key, config) => I18n.t(key, config),
//   	(key, config) => (config ? key + JSON.stringify(config) : key)
// );

export const translate = (key, key2, config) => {
	let tkey = key;
	if( null != key2 && key2 != '' ) tkey += `.${key2}`;
	return I18n.t(tkey, config)
}


export const setI18nConfig = (lang = 'en', rtl = false) => {
	// fallback if no available language fits
	const fallback = { languageTag: "en", isRTL: false };

	// const languageTag = Localization.locale || fallback.languageTag
	const languageTag = lang;
	const isRTL = rtl || fallback.isRTL
	// const isRTL = Localization.isRTL || fallback.isRTL

	// const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

	I18n.fallbacks = true;
	// clear translation cache
	// translate.cache.clear();
	// update layout direction
	I18nManager.forceRTL(isRTL);
	// I18nManager.forceRTL(true);
	// set i18n-js config
	// I18n.translations = { [languageTag]: translationGetters[languageTag] };
	I18n.translations = translationGetters;
	// I18n.translations = { [languageTag]: store.strings };
	I18n.locale = languageTag;


};


import moment from 'moment';
export const dateFormat = (date, format = '') => {
	if( format == '' ) format = 'MMMM DD, YYYY';
	let mdate = moment(date);
	if( false == mdate.isValid() ){
		mdate = moment();
	}
	return mdate.format(format);
}
export const dateTimeFormat = (date, format = '') => {
	if( format == '' ) format = 'MMMM DD, YYYY HH:mm:ss';
	let mdate = moment(date);
	if( false == mdate.isValid() ){
		mdate = moment();
	}
	return mdate.format(format);
}


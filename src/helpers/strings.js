import store from '../store';
import {sprintf} from 'sprintf-js';
export function getTrans(key = '', value = '', key2 = null ){
	const {strings} = store.getState();
	if(strings != null){
        if( key2 != null && null != strings[key] && null != strings[key][key2] ){
            return strings[key][key2];
        }
        if( null != strings[key] ){
            return strings[key];
        }
    }
    return value;
}
export function getFormatTrans(key = '', value = '', key2 = null, val1 = '', val2 = ''){
    const string = getTrans(key,value,key2);
    return sprintf(string, val1, val2)
}



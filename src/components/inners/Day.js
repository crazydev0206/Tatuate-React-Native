import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    // View,
    Image,
    TouchableOpacity
} from 'react-native';

const _ = require('lodash');

function shouldUpdate(a, b, paths) {
    for (let i = 0; i < paths.length; i++) {
        const equals = _.isEqual(_.get(a, paths[i]), _.get(b, paths[i]));
        if (!equals) {
            return true;
        }
    }
    return false;
}

import { useTheme } from '../../helpers/Theme';
const { colors } = useTheme();

import { fomartCurrOut } from '../../helpers/currency';

import TextBold from '../../components/ui/TextBold';
import TextRegular from '../../components/ui/TextRegular';
import TextMedium from '../../components/ui/TextMedium';



export default class Day extends React.Component {
    static propTypes = {
        state: PropTypes.oneOf(['disabled', 'today', '']), //TODO: deprecate
        /** The marking object */
        marking: PropTypes.any,
        /** Date marking style [simple/period/multi-dot/multi-period]. Default = 'simple' */
        // markingType: PropTypes.string,
        // markingType: PropTypes.oneOf(['dot','simple','period','multi-dot','multi-period','custom']), // error with simple
        markingType: PropTypes.oneOf(['dot','period','multi-dot','multi-period','custom']),
        /** Theme object */
        theme: PropTypes.object,
        /** onPress callback */
        onPress: PropTypes.func,
        /** onLongPress callback */
        onLongPress: PropTypes.func,
        /** The date to return from press callbacks */
        date: PropTypes.object,
        /** Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates*/
        // disableAllTouchEventsForDisabledDays: PropTypes.bool
    
    };
    constructor(props) {
        super(props)

        this.onDayPress = this.onDayPress.bind(this)
    }
    onDayPress() {
        this.props.onPress(this.props.date);
    }
    shouldComponentUpdate(nextProps) {
        return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress', 'theme']);
        // return shouldUpdate(this.props, nextProps, ['day', 'dayComponent', 'markingType', 'marking', 'onPress', 'onLongPress']);
    }
    render() {
        // theme prop
        const { date, state, marking, style } = this.props
        let notPast = null != marking && null != marking.notPast && marking.notPast === true ? true : false;
        let disabled = null != marking && null != marking.disabled && marking.disabled === true ? true : false;
        let selected = null != marking && null != marking.selected && marking.selected === true ? true : false;
        // period selected days
        let startingDay = null != marking && null != marking.startingDay && marking.startingDay === true ? true : false;
        let endingDay = null != marking && null != marking.endingDay && marking.endingDay === true ? true : false;
        let inPeriod = null != marking && null != marking.inPeriod && marking.inPeriod === true ? true : false;
        // simple selected day
        let singleDay = null != marking && null != marking.singleDay && marking.singleDay === true ? true : false;

        let prMeta = null != marking && null != marking.prmeta ? marking.prmeta : '';
        let cusStyle = {}
        let dayStyle = {}
        let metaStyle = { color: colors.addressText }
        if (state === 'today') {
            cusStyle = [cusStyle, { borderTopLeftRadius: 22, borderBottomLeftRadius: 22, borderTopRightRadius: 22, borderBottomRightRadius: 22, borderWidth: 1, borderColor: '#000', }]
            if (disabled) cusStyle = [cusStyle, { borderColor: colors.separator, }]
        }
        if (selected) {
            cusStyle = [cusStyle, { backgroundColor: colors.appColor, borderWidth: 0 }]
            dayStyle = { color: '#FFF', }
            metaStyle = { color: '#FFF' }
        }
        if (inPeriod) {
            cusStyle = [cusStyle, { backgroundColor: colors.appColor }]
            dayStyle = { color: '#FFF', }
            metaStyle = { color: '#FFF' }
        }
        // past dates
        if (false === notPast) {
            dayStyle = { color: colors.pastDay }
        }

        if (startingDay) {
            cusStyle = [cusStyle, { borderTopLeftRadius: 22, borderBottomLeftRadius: 22, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]
        }
        if (endingDay) {
            cusStyle = [cusStyle, { borderTopRightRadius: 22, borderBottomRightRadius: 22, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]
        }
        if (singleDay) {
            cusStyle = [cusStyle, { borderRadius: 22 }]
        }
        if (disabled) {
            dayStyle = { color: colors.unavailableDay }
            // if( state === 'today' ) cusStyle = [cusStyle,{borderColor:'#BEC2CE',}]
        }
        // metaStyle = Object.assign({},styles.meta,metaStyle)// [styles.meta,metaStyle]
        return (
            <TouchableOpacity
                style={[styles.container, cusStyle, style]}
                onPress={this.onDayPress}
                disabled={(disabled || false === notPast)}
            >
                { (true === disabled || false === notPast) ? <TextMedium style={[styles.day, { color: colors.backBtn, }, dayStyle]}>{String(this.props.children)}</TextMedium> : <TextBold style={[styles.day, dayStyle]}>{String(this.props.children)}</TextBold>}
                { !disabled && prMeta != '' && <TextRegular style={[styles.meta, { color: colors.addressText }, metaStyle]}>{fomartCurrOut(prMeta)}</TextRegular>}

                { disabled && <Image
                    style={styles.disabledIcon}
                    source={require('../../../assets/icons/date_disabled.png')}
                />}
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        // width: '100%',
        // height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    day: {
        textAlign: 'center',
        fontSize: 13,
    },
    meta: {
        textAlign: 'center',
        fontSize: 9,
    },
    disabledIcon: {
        position: 'absolute',
        width: 15,
        height: 15,
    }
});

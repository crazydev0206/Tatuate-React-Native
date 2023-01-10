import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import {mediumFontFamily} from '../../constants/Colors';

import {
    // Calendar,
    CalendarList,
    // LocaleConfig,
} from 'react-native-calendars';
// LocaleConfig.locales['fr'] = {
//     monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//     monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//     dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
//     dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
//     today: 'Aujourd\'hui'
// };
// LocaleConfig.defaultLocale = 'fr';

import DayCom from './Day';

import moment from 'moment';

export default class Availability extends React.Component{
  	constructor(props){
	    super(props)
	    this.state = {
            vals: [] 
        }
  	}
    onDayPress(day){
        let tempDay = Object.assign({},day)
        // need add metas to day
        const {available,bookingType,checkAvailable} = this.props.availabilityData
        if( checkAvailable && null != available[day.dateString] ){
            tempDay.metas = available[day.dateString]
        }
        const markingType = this.getMarkingType(bookingType);
        let {vals} = this.state
        // if( !Array.isArray(vals) ){
        //     vals = [tempDay]
        // }else 

        if( markingType == 'period' ){
            if( vals.length === 1 ){
                let val1 = vals[0]
                if( day.timestamp <= val1.timestamp ){
                    vals = [tempDay]
                }else{
                    vals.push(tempDay)
                }
            }else{
                vals = [tempDay]
            }
        }else{
            vals = [tempDay]
        }
        this.props.onDatesSelect(vals)
        this.setState({vals})
    }
    _getMonthNum(month){
        month = parseInt(month) + 1
        if(month < 10) return '0'+month
        return month
    }
    _getDateNum(date){
        if(date < 10) return '0'+date
        return date
    }
    _getCalendarDates(modify){
        var dates = []
        // https://stackoverflow.com/questions/33440646/how-to-properly-add-1-month-from-now-to-current-date-in-moment-js
        var currentDate = moment();
        var futureMonth = moment(currentDate).add(modify, 'M');
        var futureMonthEnd = moment(futureMonth).endOf('month');

        if(currentDate.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
            futureMonth = futureMonth.add(1, 'd');
        }

        for (let i = 0; i < 1000; i++) {
            let temp = moment(currentDate).add(i,'d')
            // https://stackoverflow.com/questions/22600856/moment-js-date-time-comparison
            if( temp.isAfter(futureMonthEnd) ) break;

            dates.push( temp.format('YYYY-MM-DD') )
        }
        return dates;
    }
    getMarkingType(bkType){
        let mkType = 'dot';
        if( null != bkType && bkType === 'hotel_rooms' ) mkType = 'period';

        return mkType;
    }
  	render(){
  		const {apColors} = this.props;
        let {available,bookingType,checkAvailable,months_available} = this.props.availabilityData
        // console.log(checkAvailable)
        // console.log(available)
        const markingType = this.getMarkingType(bookingType);
        const {vals} = this.state
        let monthsAvailable = parseInt(months_available )
        if( !monthsAvailable || isNaN(monthsAvailable) ) monthsAvailable = 2

        monthsAvailable = monthsAvailable -1;
        let markedDates = {}
        const calDates = this._getCalendarDates(monthsAvailable)
        // perfome date check for available check
        if( checkAvailable ){

            
            if( calDates.length ){

                calDates.forEach(cald=>{
                    if( null != available[cald] ){
                        markedDates[cald] = {notPast: true,available: true}
                        // console.log(markedDates)
                        const metas = available[cald]
                        // if( null != metas ){
                        //     markedDates[cald]['metas'] = metas
                        //     if( null != metas.mbApps && metas.mbApps != '' ){
                        //         markedDates[cald]['prmeta'] = metas.mbApps
                        //     }
                        // } 
                        if( null != metas && null != metas.mbApps && metas.mbApps != '' ) markedDates[cald]['prmeta'] = metas.mbApps
                    }else{
                        markedDates[cald] = {notPast: true,disabled: true}
                    }
                })
            }

        }else{
            if( calDates.length ){
                calDates.forEach(cald=>{
                    markedDates[cald] = {notPast: true}
                })
            }
        }
        
        if( Array.isArray(vals) && vals.length ){
            let val1 = vals[0]
            if( markingType == 'period' ){
                markedDates[val1.dateString] = Object.assign({}, null != markedDates[val1.dateString] ? markedDates[val1.dateString] : {} ,{selected: true,startingDay: true,endingDay: false})
                if( vals.length === 2 ){
                    let val2 = vals[1],
                        val1Year = val1.year,
                        val1Month = val1.month,
                        val1Day = val1.day;
                    // loop for inside
                    for (let i = 1; i <= 365; i++) {
                        let temp = new Date(val1Year, val1Month - 1, val1Day + i )
                        if( temp.getTime() < val2.timestamp ){
                            let tmpY = temp.getFullYear(), tmpM = this._getMonthNum( temp.getMonth() ), tmpD = this._getDateNum( temp.getDate() );

                            markedDates[`${tmpY}-${tmpM}-${tmpD}`] = Object.assign({}, null != markedDates[`${tmpY}-${tmpM}-${tmpD}`] ? markedDates[`${tmpY}-${tmpM}-${tmpD}`] : {} , {inPeriod: true} )
                        }else{
                            break;
                        }
                    }
                    markedDates[val2.dateString] = Object.assign({}, null != markedDates[val2.dateString] ? markedDates[val2.dateString] : {} , {selected: true,startingDay: false,endingDay: true} )
                }
            }else{
                markedDates[val1.dateString] = Object.assign({}, null != markedDates[val1.dateString] ? markedDates[val1.dateString] : {} , {selected: true,singleDay: true} )
            }
        }


        // console.log(markedDates)
  		return(
        <View style={[styles.container,{backgroundColor: apColors.appBg,},this.props.style]}>
                <CalendarList

                    // dayComponent={({date, state}) => {
                    //     return (
                    //       <View>
                    //         <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                    //           {date.day} $10
                    //         </Text>
                    //       </View>
                    //     );
                    // }}

                    dayComponent={DayCom}
                    // dayComponent={({date, state, marking}) => <DayCom date={date} state={state} marking={marking} /> }
                    // dayComponent={props => {
                    //     console.log('props')
                    //     // console.log(props)
                    //     return <DayCom {...props}/>
                    // } }
                    // Enable horizontal scrolling, default = false
                    // horizontal={true}
                    // // Enable paging on horizontal, default = false
                    // pagingEnabled={false}
                    // // Set custom calendarWidth.
                    // calendarWidth={320}


                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    // onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={0}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={monthsAvailable}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={false}

                    


                    // Initially visible month. Default = Date()
                    //current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    //minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    //maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined - not for custom day component
                    onDayPress={(day)=>this.onDayPress(day)}
                    // Handler which gets executed on day long press. Default = undefined
                    // onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    // onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    // hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    // renderArrow={(direction) => (<Arrow/>)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={false}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    // onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    // onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    // disableArrowLeft={true}
                    // Disable right arrow. Default = false
                    // disableArrowRight={true}
                    markedDates={markedDates}
                    // Date marking style [dot/period/multi-dot/custom]. Default = 'dot'
                    markingType={markingType}

                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                        appColor: apColors.appColor,
                        addressText: apColors.addressText,
                        separator: apColors.separator,
                        pastDay: apColors.pastDay,
                        unavailableDay: apColors.unavailableDay,
                        backBtn: apColors.backBtn,
                        
                        // backgroundColor: apColors.secondBg,
                        calendarBackground: apColors.secondBg,
                        // textSectionTitleColor: '#b6c1cd',
                        // selectedDayBackgroundColor: '#00adf5',
                        // selectedDayTextColor: '#ffffff',
                        // todayTextColor: '#00adf5',
                        dayTextColor: apColors.tText,
                        // textDisabledColor: '#d9e1e8',
                        // dotColor: '#00adf5',
                        // selectedDotColor: '#ffffff',
                        // arrowColor: 'orange',
                        // disabledArrowColor: '#d9e1e8',
                        monthTextColor: apColors.tText,
                        // indicatorColor: 'blue',
                        textDayFontFamily: mediumFontFamily,
                        textMonthFontFamily: mediumFontFamily,
                        textDayHeaderFontFamily: mediumFontFamily,
                        // textDayFontWeight: '300',
                        // textMonthFontWeight: 'bold',
                        // textDayHeaderFontWeight: '300',
                        // textDayFontSize: 16,
                        // textMonthFontSize: 16,
                        // textDayHeaderFontSize: 16,

                        // 'stylesheet.calendar.main': {
                        //     // monthView: {
                        //     //     backgroundColor: apColors.secondBg,
                        //     // },
                        //     week: {
                        //         marginTop: 2,
                        //         marginBottom: 2, 
                        //         flexDirection: 'row',
                        //         // justifyContent: 'center'
                        //         justifyContent: 'space-around',
                        //         // flex: 1,
                        //     },
                        //     // dayWrap: {
                        //     //     flex: 0,
                        //     //     width: 44,
                        //     //     height: 44,
                        //     // }
                        // },
                        // 'stylesheet.calendar-list.main': {
                        //     monthView: {
                        //         backgroundColor: apColors.secondBg,
                        //     },
                        // },
                    }}
                    // calendarHeight={400}
                    calendarStyle = {{height: 380,}}
                    style={{height:'100%'}}
                />

            </View>
  		)
  	}
}


const styles = StyleSheet.create({
	container: {
        flex: 1,
        
    },
});



			
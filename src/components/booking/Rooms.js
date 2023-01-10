import React from 'react';
import {
	StyleSheet,
	View,
    Image,
	TouchableOpacity,
    ActivityIndicator
} from 'react-native';


import {translate} from '../../helpers/i18n';
import {fomartCurrOut} from '../../helpers/currency';

import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import Qtts from '../ui/Qtts';

import RoomImages from '../inners/RoomImages';

import axios from 'axios';

export default class Rooms extends React.Component{
    constructor(props){
        super(props)
        this.state = {rooms: [], available: [],loading: true,booked: []}

    }
    componentDidMount(){
        const {checkin, checkout, lid} = this.props
        
        axios.get(`/booking/rooms?checkin=${checkin}&checkout=${checkout}&id=${lid}`).then(res => {
            
            const {available, rooms} = res.data;
            if( null != available && null != rooms && Array.isArray(available) && available.length > 0 && Array.isArray(rooms) && rooms.length > 0 ){
                this.setState( {available, rooms, loading: false} )
            }else{
                this.setState( {available: [], rooms: [], loading: false} )
            }
            
            //Error handle the promise and set your errorMessage
        }).catch(err => {
            
            this.setState( {available: [], rooms: [], loading: false} ) 
        });
    }
    onChangeQtt(qtt, room){
        let {booked} = this.state
        const findIdx = booked.findIndex(rm=>rm.ID === room.id)
        if( -1 !== findIdx ){
            booked[findIdx]['qtt'] = qtt
        }else{
            booked.push( {...room, ID:room.id, qtt: qtt} )
        }

        this.props.onSelectRooms(booked)
        this.setState({booked})
    }
    render(){
        const {apColors} = this.props;
        const {available,booked,loading,rooms} = this.state
        let roomsJsx = [], count = 1;
        if( null != rooms && Array.isArray(available) && available.length > 0 ){
            available.forEach(room=>{
                let findRoom = rooms.find(rm => rm.id === parseInt(room.id) )
                if( null != findRoom ){
                    findRoom.quantities = room.quantities
                    // get booked qtt
                    let rQtt = 0;
                    const findQtt = booked.find(bk => bk.ID === findRoom.id )
                    if( findQtt != null ) rQtt = findQtt.qtt
                    let adStyle = {}
                    if( count > 1 ) adStyle = {marginTop: 15, paddingTop: 15,borderTopWidth: 1,borderTopColor: apColors.separator,}
                    roomsJsx.push( <Room data={findRoom} priceBased={this.props.priceBased} key={room.id} style={adStyle} qtt={rQtt} onChangeQtt={(qtt)=>this.onChangeQtt(qtt,findRoom)} apColors={apColors}/>)

                    count++;
                }
                
            })
        }   
        return(
        <View style={[styles.container,this.props.style]}>
            { loading === true ? <View style={styles.loadingWrap}><ActivityIndicator animating={loading} /></View>   : <View style={styles.inner}>{roomsJsx}</View> }
        </View>
        )
    }
}


function Room(props){
    const {apColors} = props;
    const rMetaStyle = {
        color: apColors.addressText,
        fontSize: 13,
        marginTop: 4,
    };
    // console.log(props.qtt);
    return (
        
            <View style={[styles.roomWrap,props.style]}>
                
                <View style={styles.roomDetails}>
                    
                    <TextHeavy style={{
                        color: apColors.tText,
                        fontSize: 15,
                    }}>{props.data.title}</TextHeavy>
                    
                    <View style={styles.roomGuests}>
                        <TextRegular style={rMetaStyle}>{translate(props.priceBased, 'bk_room_adults', {count: parseInt(props.data.adults)} )}</TextRegular>
                        <TextRegular style={[rMetaStyle,{marginLeft:10}]}>{translate(props.priceBased, 'bk_room_children', {count: parseInt(props.data.children)} )}</TextRegular>
                    </View>
                    <TextRegular style={rMetaStyle}>{translate(props.priceBased, 'bk_room_avai', {count: parseInt(props.data.quantities)} )}</TextRegular>
                    
                    { null != props.data.images && props.data.images.length > 0 && <RoomImages photos={props.data.images} apColors={apColors}/> }
                </View>
                <View style={styles.roomQtts}>
                    <Qtts min={0} max={props.data.quantities} onChange={props.onChangeQtt} value={props.qtt}/>
                    <TextHeavy style={{
                        color: apColors.appColor,
                        fontSize: 17,
                        marginTop: 20,
                    }}>{fomartCurrOut(props.data.price)}</TextHeavy>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
	container: {
        // flex: 1,
        // width: '100%',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // // alignItems: 'center',
    },
    inner: {
        // flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'nowrap',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    loadingWrap: {
        padding: 10,
    },
    roomWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    roomDetails: {

    },
    roomGuests: {
        flexDirection: 'row',
    },
    roomQtts: {
        alignItems: 'flex-end',
        // justifyContent: 'space-between',
    },
});
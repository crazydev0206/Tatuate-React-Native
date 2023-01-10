// https://medium.com/@KPS250/custom-scale-slider-in-react-native-cb3e6ff786bd
import React, {Component} from 'react';
import {StyleSheet,Text,View, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import { CustomMarker } from './CustomMarker';
// import { Item } from './Item';


const compareArray = (v1, v2) =>{
    if (typeof(v1) !== typeof(v2)) {
        return false;
    }
    if (typeof(v1) === "function") {
        return v1.toString() === v2.toString();
    }
    if (v1 instanceof Array && v2 instanceof Array) {
        // compare lengths - can save a lot of time 
        if (v1.length != v2.length)
            return false;
        for (let i = 0; i < v1.length; i++) {
            if (v1[i] != v2[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }
        return true;  
    } else {
        return v1 === v2;
    }
}
export class CustomSlider extends Component{

    constructor(props) {
        super(props);
        let state = { 
            multiSliderValue: [this.props.min, this.props.max],
            first: this.props.min,
            second: this.props.max,
        }
        if( null != this.props.values){
            if( Array.isArray(this.props.values) && this.props.values.length === 2 ){
                state.multiSliderValue = [...this.props.values]
            }else{
                state.multiSliderValue[1] = this.props.values
            }
        }
        this.state = state

    }

    static getDerivedStateFromProps(props, state) {
        if( null != props.values && Array.isArray(props.values) && false == compareArray(props.values, state.multiSliderValue) ){
            return {multiSliderValue: [...props.values]}
        }
        // No state update necessary
        return null;
    }

    render() {
        return (
            <View style={[{flex: 1,},this.props.style]}>
                {/*<View style={[styles.column,{marginLeft:this.props.LRpadding,marginRight:this.props.LRpadding}]}>
                    {this.renderScale()}
                </View>*/}
                <View style={styles.container}>
            
                    <MultiSlider
                        trackStyle={{backgroundColor:'#EAECEF'}}
                        selectedStyle={{backgroundColor: this.props.apColors.appColor}}
                        values={ this.props.single ? [this.state.multiSliderValue[1]] : [this.state.multiSliderValue[0],this.state.multiSliderValue[1]] }
                        sliderLength={Dimensions.get('window').width-this.props.LRpadding*2}
                        onValuesChange={this.multiSliderValuesChange}
                        min={this.props.min}
                        max={this.props.max}
                        step={1}
                        allowOverlap={false}
                        // customMarker={CustomMarker}
                        snapped={true}
                    />
                </View>
            </View>
        );
    }

    multiSliderValuesChange = values => {
        if(this.props.single ){
            this.setState({
                second : values[0],
            })  
        }else{
            this.setState({
                multiSliderValue: values,
                first : values[0],
                second : values[1],
            }) 
        }
        this.props.callback(values)
    }

    renderScale=()=> {
        const items = [];
        for (let i=this.props.min; i <= this.props.max; i++) {
            if( i % 10 == 0 ) items.push(
                <Item 
                    key={i}
                    value = {i}
                    first = {this.state.first}
                    second = {this.state.second}
                />
            );
        }
        return items;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    column:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        bottom:-20,
    },
    active:{
        textAlign: 'center',
        fontSize:20,
        color:'#5e5e5e',
    },
    inactive:{
        textAlign: 'center',
        fontWeight:'normal',
        color:'#bdc3c7',
    },
    line:{
        textAlign: 'center',
    }
});

class Item extends Component {   
    render() {
        return (
            <View>
                <Text style={ [ this.checkActive() ? itemStyles.active : itemStyles.inactive]}>{this.props.value}</Text>
                <Text style={[ this.checkActive() ? itemStyles.line : {}]}> { this.checkActive() ? '|' : ''}</Text>
            </View>
        );
    }

    checkActive =()=>{
        if(this.props.value >= this.props.first && this.props.value <= this.props.second)
            return true 
        else
            return false 
    }
}

const itemStyles = StyleSheet.create({
    active:{
        textAlign: 'center',
        fontSize:20,
        bottom:10,
        color:'#5e5e5e',
    },
    inactive:{
        flex:1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight:'normal',
        color:'#bdc3c7',
    },
    line:{
        fontSize:10,
        textAlign: 'center',
    }
});
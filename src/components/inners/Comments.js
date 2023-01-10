import React from 'react';
import {
	StyleSheet,
	View,
    Image,
    // Dimensions,
} from 'react-native';
import NavigationService from '../../helpers/NavigationService';


import {translate} from "../../helpers/i18n";
import {getLoggedInID} from "../../helpers/user";

import moment from 'moment';
import BtnLink from '../../components/ui/BtnLink';
import Btn from '../../components/ui/Btn';
import TextBold from '../../components/ui/TextBold';
import TextRegular from '../../components/ui/TextRegular';
import Reviews from '../Reviews';

export default class Comments extends React.Component{
  	constructor(props){
	    super(props)
	    this.state={allReviews: false}
  	}
    goToComments(){
        NavigationService.navigate( 'Comments' );
    }
  	render(){
        const {allReviews} = this.state;
  		const {rating,ratingFields,comments,apColors} = this.props
  		let jsx = []
  		if(Array.isArray(ratingFields) && ratingFields.length ){
  			ratingFields.forEach((dtbj,idx)=>{
  				jsx.push(<Criteria key={idx} data={dtbj} apColors={apColors}/>)
  			});
  		}
        let commentsJsx = [],
            moreComments = false;
        if( Array.isArray(comments) && comments.length > 0){
            if( comments.length > 1 ) moreComments = true;
            let showingReviews = comments.slice(0,1)
            if( allReviews ) showingReviews = comments
            showingReviews.forEach((cmbj,idx)=>{
                commentsJsx.push(<Comment key={idx} data={cmbj} apColors={apColors}/>)
            });
        }
        let showCommentBtn = true;
        if( null != this.props.comment_reglogin && this.props.comment_reglogin == true && getLoggedInID() == 0 ) showCommentBtn = false;
  		return(
        <View style={styles.container}>
            <TextBold style={{color: apColors.tText, fontSize: 15,marginTop: 10,}}>{translate('slisting','reviews')}</TextBold>
          
            <View style={[styles.inner, this.props.style]}>
                <View style={styles.reviewsTop}>
                    <View style={styles.reviewsTopLeft}>
                        { null != rating && rating.rating > 0 && <View style={[styles.reviewScore,{backgroundColor: apColors.appColor,}]}><TextBold style={{color:'#FFF', fontSize: 24}}>{rating.rating}</TextBold></View> }
                        <Reviews rating={rating} showCount={true} style={{marginTop:10}}/>
                    </View>
                    
                    { showCommentBtn && <Btn center onPress={ ()=>this.goToComments() }>{translate('slisting','write_review')}</Btn> }
                </View>
                <View style={styles.rFields}>{ jsx }</View>
                <View style={styles.commentsWrap}>{ commentsJsx }</View>

                { !allReviews && moreComments && <BtnLink center onPress={ ()=> this.setState({allReviews: true}) }>{translate('slisting','all_comments')}</BtnLink> }
                { allReviews && moreComments && <BtnLink center onPress={ ()=> this.setState({allReviews: false}) }>{translate('slisting','close_comments')}</BtnLink> }

            </View>
        </View>
  		)
  	}
}

function Criteria(props){
	return (
		<View style={styles.criteriaWrap}>
            <View style={styles.criteriaInner}>
                <TextRegular style={{color: props.apColors.tText,marginBottom:5,fontSize: 15}}>{props.data.title}</TextRegular>
                <View style={styles.criteriaDetails}>
                    <View style={styles.rFieldBg}>
                        <View style={[styles.rFieldValue,{backgroundColor: props.apColors.appColor,width: props.data.percent+'%'}]}></View>
                    </View>
                    <TextRegular style={{color: props.apColors.pText,fontSize:15}}>{props.data.value}</TextRegular>
                </View>
            </View>
		</View>
	)
}
function Comment(props){
    const {avatar_url,comment_author,comment_content,comment_date_gmt} = props.data
    return (
        <View style={styles.commentWrap}>
            <View style={styles.commentHead}>
                { null != avatar_url && avatar_url != '' && <Image
                    style={styles.avatar}
                    source={{uri: avatar_url}}
                    resizeMode="cover"
                />}
                <View style={styles.commentAu}>
                    <TextBold style={{color: props.apColors.tText, fontSize: 15,lineHeight:20}}>{comment_author}</TextBold>
                    <TextRegular style={{color: props.apColors.addressText, fontSize: 13,lineHeight:18}}>{moment.utc(comment_date_gmt).fromNow()}</TextRegular>
                </View>
            </View>
            <View style={styles.commentDetails}>
                
                <TextRegular style={{color: props.apColors.pText, fontSize: 15,lineHeight:20,marginTop:10}}>{comment_content}</TextRegular>
                
                {/*<TextRegular style={{color:'rgba(0,0,0,0.4)', fontSize: 15,lineHeight:20,marginTop:15}}>Reply</TextRegular>*/}
                
                <View style={styles.divider}/>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
        marginTop: 10,
    },
    reviewScore: {
        width: 70,
        height: 60,
        borderRadius: 5,
        
        // textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inner: {
        marginTop: 10,
    },
    reviewsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    reviewsTopLeft: {

    },
    reviewsTopRight: {

    },
    rFields: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    criteriaWrap: {
		// padding: 10,
        // paddingRight: 10
        paddingVertical: 5,
        width: '48%',
    },
    criteriaInner: {
		// borderRadius: 4,
		// overflow: 'hidden',
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    criteriaDetails: {
        flexDirection: 'row',
        // flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rFieldBg: {
        width: '80%',
        height: 6,
        backgroundColor: '#e2e2e2',
        borderRadius: 3,
    },
    rFieldValue: {
        width: '80%',
        height: 6,
        
        borderRadius: 3,
    },
    commentsWrap: {

    },
    commentWrap: {
        marginTop: 15,
    },
    commentHead: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 15,
    },
    commentDetails: {

    },
    divider: {
        // flex: 1,
        // height: 1,
        // backgroundColor: '#E4E4E4',
        // marginTop: 15,
    }
});



			
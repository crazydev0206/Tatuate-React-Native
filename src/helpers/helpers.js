import {useTheme} from './Theme';
const {colors} = useTheme();
export function aweIcon(icon){
	return icon
		.replace('fa ','')
		.replace('fas','')
		.replace('fab','')
		.replace('far','')
		.replace('fal','')
		.replace('fad','')
		.trim()
		.replace('fa-','')
		// .replace('cocktail','glass') // event
		// .replace('dumbbell','heart') // fitness
		.replace('cheeseburger','hamburger') // restaurant
		.replace('cutlery','utensils') // restaurant
		.replace('futbol-o','futbol') // fitness
		.replace('hand-peace-o','hand-peace')
		
		// .replace('utensils','question-circle-o')
		// .replace('parking','question-circle-o')
		// .replace('concierge-bell','question-circle-o')
		// .replace('snowflake','question-circle-o')
		// .replace('glass-martini','question-circle-o')
		// .replace('award','question-circle-o')
		.replace('smile-plus','smile')
		.replace('home-heart','heart')

		



}
// import Colors from '../constants/Colors';
export function categoryColor(color){
	if( color === 'custom' ) 
		return colors.appColor;
	color = ''+color.replace('-bg','CBg')
	if( null != colors[color] ) 
		return colors[color]
	return colors.appColor;
}

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
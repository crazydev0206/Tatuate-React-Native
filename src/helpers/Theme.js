import {
	Appearance,
	useColorScheme,
} from 'react-native';
import { themedColors } from '../constants/Colors'
export const useTheme = () => {
	const theme = Appearance.getColorScheme();
	// const theme = useColorScheme();
  	const colors = theme ? themedColors[theme] : themedColors.default
  	return {
    	colors,
    	theme,
  	}
}

export default function getThemedColors(theme){
	const colors = theme ? themedColors[theme] : themedColors.default
	return colors;
}
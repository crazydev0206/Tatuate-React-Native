import React from "react"
import {
    useColorScheme,
} from 'react-native';
import Svg, {
	// Circle,
	// Ellipse,
	G,
	// Text,
	// TSpan,
	// TextPath,
	Path,
	// Polygon,
	// Polyline,
	Line,
	Rect,
	Use,
	// Image,
	// Symbol,
	Defs,
	// LinearGradient,
	// RadialGradient,
	// Stop,
	// ClipPath,
	// Pattern,
	// Mask,
} from 'react-native-svg';

import getThemedColors from '../../helpers/Theme';

export const AvatarSvg = (props) => {
  	return (
  		<Svg width={18} height={20} viewBox="0 0 18 20" {...props}>
	      	<Path
		        d="M9 10c4.833 0 8.75 3.542 8.75 7.917 0 1.15-.933 2.083-2.083 2.083H2.333A2.083 2.083 0 01.25 17.917C.25 13.542 4.167 10 9 10zM9 0a4.167 4.167 0 110 8.333A4.167 4.167 0 019 0z"
		        fill={ null != props.fill ? props.fill : "#000"}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}

		

export const ArrowLeftSvg = (props) => {
  	return (
  		<Svg width={18} height={16} viewBox="0 0 18 16" {...props}>
	      	<Defs>
		        <Path
		          	d="M12.993 20.119c.395.432.4 1.127.007 1.558a.936.936 0 01-1.418-.004l-6.285-6.894a1.173 1.173 0 010-1.56l6.285-6.893A.94.94 0 0113 6.32c.39.428.392 1.121-.007 1.559l-4.579 5.022h13.584C22.55 12.902 23 13.39 23 14c0 .606-.452 1.097-1.002 1.097H8.414l4.58 5.023z"
		          	id="prefix__a"
		        />
	      	</Defs>
	      	<Use
		        fill={ null != props.fill ? props.fill : "#000"}
		        xlinkHref="#prefix__a"
		        transform="translate(-5 -6)"
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const CloseSvg = (props) => {
  	return (
  		<Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
	      	<Defs>
		        <Path
		          	d="M6.323 21.677c.43.43 1.131.43 1.562 0L14 15.562l6.115 6.115a1.105 1.105 0 001.562-1.562L15.562 14l6.115-6.115a1.105 1.105 0 00-1.562-1.562L14 12.438 7.885 6.323a1.105 1.105 0 00-1.562 1.562L12.438 14l-6.115 6.115c-.43.43-.43 1.131 0 1.562z"
		          	id="prefix__a"
		        />
	      	</Defs>
	      	<Use
		        fill={ null != props.fill ? props.fill : "#000"}
		        xlinkHref="#prefix__a"
		        transform="translate(-6 -6)"
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const ShareSvg = (props) => {
  	return (
  		<Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
	      	<Path
	        	d="M16.136 12.955c-.882-.001-1.73.341-2.363.954l-6.528-3.264c0-.136.028-.277.028-.418 0-.14 0-.282-.028-.418l6.528-3.264a3.41 3.41 0 10-1.046-2.454c0 .14 0 .282.028.418L6.227 7.773a3.41 3.41 0 100 4.909l6.528 3.263c0 .137-.028.278-.028.419a3.41 3.41 0 103.41-3.41z"
	        	fill={ null != props.fill ? props.fill : "#000"}
	        	fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const MoreSvg = (props) => {
  	return (
  		<Svg width={6} height={20} viewBox="0 0 6 20" {...props}>
	      	<Path
	        	d="M3 12.292a2.292 2.292 0 110-4.584 2.292 2.292 0 010 4.584zM3 20a2.292 2.292 0 110-4.583A2.292 2.292 0 013 20zM3 4.583A2.292 2.292 0 113 0a2.292 2.292 0 010 4.583z"
	        	fill={ null != props.fill ? props.fill : "#000"}
	        	fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const GoDetailsSvg = (props) => {
  	return (
  		<Svg width={7} height={10} viewBox="0 0 7 10" {...props}>
	      	<Path
		        d="M0 8.82L3.82 5 0 1.18 1.18 0l5 5-5 5z"
		        fill={ null != props.fill ? props.fill : "#BEC2CE"}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const ArrowDetailsSvg = (props) => {
  	return (
  		<Svg width={8} height={14} viewBox="0 0 8 14" {...props}>
	      	<Path
		        d="M.067 1.87L1.46.5 8.067 7 1.46 13.5.067 12.13 5.28 7z"
		        fill={ null != props.fill ? props.fill : "#C7C7CC"}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}		

export const NotificationsSvg = (props) => {
  	return (
  		<Svg width={29} height={30} viewBox="0 0 29 30" {...props}>
	      	<G transform="translate(0 .5)" fill="none" fillRule="evenodd">
	        	<Rect fill="#FF3B30" width={29} height={29} rx={6} />
		        <Path
		          	d="M15.65 7a5.248 5.248 0 00-.144 1H9a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-6.506a5.248 5.248 0 001-.144V20a3 3 0 01-3 3H9a3 3 0 01-3-3V10a3 3 0 013-3h6.65zm5.1 5a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5z"
		          	fill="#FFF"
		          	fillRule="nonzero"
		        />
	      	</G>
	    </Svg>
  	)
}		

export const CardsSvg = (props) => {
  	return (
  		<Svg width={29} height={30} viewBox="0 0 29 30" {...props}>
	      	<G transform="translate(0 .5)" fill="none" fillRule="evenodd">
	        	<Rect fill="#5AC8FA" width={29} height={29} rx={6} />
	        	<Path
	          		d="M21.003 8.34H7.997c-.945 0-1.711.765-1.711 1.71v8.9c0 .945.766 1.71 1.711 1.71h13.006a1.711 1.711 0 001.711-1.71v-8.9a1.711 1.711 0 00-1.711-1.71zm-1.37 9.925h-1.71a.685.685 0 010-1.37h1.71a.685.685 0 010 1.37zm0-6.16H9.367a.685.685 0 010-1.37h10.268a.685.685 0 110 1.37z"
	          		fill="#FFF"
	        	/>
	      	</G>
	    </Svg>
  	)
}	

export const CurrencySvg = (props) => {
  	return (
	  	<Svg width={29} height={30} viewBox="0 0 29 30" {...props}>
	      	<G fill="none" fillRule="evenodd">
	        	<Rect
		          	width={29}
		          	height={29}
		          	rx={6}
		          	transform="translate(0 .5)"
		          	fill="#FF9500"
		        />
		        <Path
		          	d="M14.5 7.286a8.214 8.214 0 100 16.428 8.214 8.214 0 000-16.428zm.856 12.263v.441a.643.643 0 01-.644.644h-.424a.643.643 0 01-.644-.644v-.434a3.193 3.193 0 01-1.738-.657.643.643 0 01-.059-.962l.305-.301a.65.65 0 01.842-.058c.251.18.553.277.863.277h1.28a.643.643 0 00.592-.366.616.616 0 00-.384-.842l-2.183-.654a2.32 2.32 0 01-1.657-2.163 2.396 2.396 0 012.14-2.396v-.424a.643.643 0 01.643-.644h.424c.356 0 .644.288.644.644v.434a3.214 3.214 0 011.742.657.643.643 0 01.055.959l-.305.304a.643.643 0 01-.839.058 1.492 1.492 0 00-.866-.277H13.86a.633.633 0 00-.64.558.616.616 0 00.435.65l2.183.654a2.32 2.32 0 011.657 2.163 2.396 2.396 0 01-2.14 2.379z"
		          	fill="#FFF"
		        />
	      	</G>
	    </Svg>
  	)
}		

export const LanguageSvg = (props) => {
  	return (
	  	<Svg width={29} height={29} viewBox="0 0 29 29" {...props}>
	      	<G fill="none" fillRule="evenodd">
	        	<Rect fill="#5856D6" width={29} height={29} rx={6} />
	        	<Path
	          		d="M20.89 8.112a9.017 9.017 0 00-6.39-2.648A9.012 9.012 0 008.11 8.11a9.017 9.017 0 00-2.646 6.39 9.005 9.005 0 002.646 6.39 9.017 9.017 0 006.39 2.646 9.005 9.005 0 006.39-2.646 9.017 9.017 0 002.646-6.39 9.005 9.005 0 00-2.646-6.388zm1.135 5.652h-2.49a14.08 14.08 0 00-.51-3.21c.548-.17 1.055-.369 1.518-.598a7.518 7.518 0 011.482 3.808zM15.238 7.4c.164.075.324.175.485.3.427.336.833.848 1.176 1.483.055.103.11.21.162.32-.584.1-1.198.167-1.825.196v-2.3h.002zm-3.14 1.783c.342-.636.75-1.149 1.176-1.483a2.48 2.48 0 01.487-.302v2.301a14.784 14.784 0 01-1.828-.195c.055-.11.109-.216.164-.321zm-.855 2.355c.05-.216.104-.426.163-.631.756.146 1.545.234 2.356.27v2.586h-2.821c.039-.767.14-1.514.302-2.225zm2.52 3.702v2.588c-.808.033-1.594.123-2.348.267-.063-.214-.12-.433-.172-.66-.16-.7-.26-1.437-.3-2.195h2.82zm0 4.065v2.27a2.397 2.397 0 01-.487-.303c-.428-.335-.834-.848-1.177-1.482a6.147 6.147 0 01-.15-.292c.58-.1 1.19-.164 1.813-.193zm3.138.485c-.343.636-.75 1.149-1.177 1.482-.16.126-.322.225-.485.3v-2.267c.624.03 1.232.094 1.811.191-.05.1-.097.198-.15.294zm.854-2.355c-.052.227-.11.446-.172.66a16.26 16.26 0 00-2.345-.267v-2.588h2.817c-.038.757-.14 1.492-.3 2.195zm-2.517-3.67v-2.589c.81-.033 1.598-.123 2.354-.269.06.205.115.415.163.63.162.712.263 1.457.302 2.226h-2.82v.002zm4.25-4.945c-.3.127-.621.241-.959.343a8.952 8.952 0 00-.33-.68 7.523 7.523 0 00-.53-.847 7.543 7.543 0 011.82 1.184zm-8.16-1.182c-.186.258-.363.54-.527.846a8.945 8.945 0 00-.33.68 9.38 9.38 0 01-.957-.343 7.45 7.45 0 011.814-1.183zm-2.87 2.32c.46.228.967.427 1.515.595a14.08 14.08 0 00-.509 3.21h-2.49a7.535 7.535 0 011.483-3.806zm-1.483 5.282h2.49c.054 1.13.231 2.217.515 3.21-.551.169-1.06.368-1.525.598a7.562 7.562 0 01-1.48-3.808zm2.537 4.944a9.02 9.02 0 01.968-.346c.1.225.205.442.319.652.175.325.363.624.562.895a7.64 7.64 0 01-1.85-1.2zm8.123 1.2c.2-.27.389-.569.564-.894.113-.208.22-.427.32-.652.342.103.667.219.97.348a7.676 7.676 0 01-1.854 1.199zm2.908-2.337c-.465-.23-.974-.43-1.527-.6.286-.992.461-2.078.514-3.207h2.494a7.5 7.5 0 01-1.481 3.807z"
	          		fill="#FFF"
	        	/>
	      	</G>
	    </Svg>
  	)
}


export const TermsSvg = (props) => {
  	return (
	  	<Svg width={29} height={30} viewBox="0 0 29 30" {...props}>
	      	<G transform="translate(0 .5)" fill="none" fillRule="evenodd">
	        	<Rect 
	        		fill={ null != props.fill ? props.fill : "#000"}
	        		width={29} height={29} rx={6} />
	        	<Path
		          	d="M14.5 6.286a8.214 8.214 0 100 16.428 8.214 8.214 0 000-16.428zm0 13.006a.685.685 0 110-1.37.685.685 0 010 1.37zm1.078-3.97a.582.582 0 00-.393.52v.37a.685.685 0 11-1.37 0v-.37c.01-.8.509-1.511 1.257-1.794a1.53 1.53 0 00.968-1.454 1.568 1.568 0 00-1.52-1.517 1.506 1.506 0 00-1.102.445c-.293.289-.459.684-.458 1.096a.685.685 0 11-1.37 0 2.91 2.91 0 012.91-2.91h.041a2.91 2.91 0 011.027 5.613h.01z"
		          	fill="#FFF"
	        	/>
	      	</G>
    	</Svg>
  	)
}


export const PrivacySvg = (props) => {
  	return (
	  	<Svg width={29} height={30} viewBox="0 0 29 30" {...props}>
	      	<G fill="none" fillRule="evenodd">
	        	<Rect
		          	width={29}
		          	height={29}
		          	rx={6}
		          	transform="translate(0 .5)"
		          	fill="#4CD964"
	        	/>
	        	<Path
		          	d="M19.716 9.27L14.96 6.896a1.027 1.027 0 00-.918 0L9.284 9.271c-.58.29-.946.884-.945 1.533v5.51a6.16 6.16 0 003.17 5.387L14 23.071c.311.173.689.173 1 0l2.491-1.37a6.16 6.16 0 003.17-5.387v-5.51a1.711 1.711 0 00-.945-1.533zm-2.82 5.004L14.5 16.711a.685.685 0 01-.969 0l-1.393-1.393a.685.685 0 01.969-.968l.91.91 1.934-1.937a.685.685 0 01.945.951z"
		          	fill="#FFF"
	        	/>
	      	</G>
	    </Svg>
  	)
}

export const HelpCenterSvg = (props) => {
  	return (
	  	<Svg width={29} height={30} viewBox="0 0 29 30" {...props}>
	      	<G fill="none" fillRule="evenodd">
		        <Rect
		          	width={29}
		          	height={29}
		          	rx={6}
		          	transform="translate(0 .5)"
		          	fill="#FC0"
		        />
		        <Path
		          	d="M14.5 6.786A8.214 8.214 0 006.286 15v6.259c0 1.08.875 1.955 1.955 1.955h.783c.648 0 1.173-.525 1.173-1.173v-3.52c0-.649-.525-1.174-1.173-1.174a.782.782 0 01-.783-.782V15a6.259 6.259 0 0112.518 0v1.565c0 .432-.35.782-.783.782-.648 0-1.173.525-1.173 1.173v3.52c0 .649.525 1.174 1.173 1.174h.783c1.08 0 1.955-.875 1.955-1.955V15A8.214 8.214 0 0014.5 6.786z"
		          	fill="#FFF"
		        />
	      	</G>
	    </Svg>
  	)
}


export const AboutUsSvg = (props) => {
  	return (
	  	<Svg width={29} height={29} viewBox="0 0 29 29" {...props}>
	      	<G fill="none" fillRule="evenodd">
	        	<Rect width={29} height={29} rx={6} fill="#007AFF" />
	        	<Path
		          	d="M14.5 6.786a8.214 8.214 0 100 16.428 8.214 8.214 0 000-16.428zm.685 11.637a.685.685 0 01-1.37 0v-4.45a.685.685 0 111.37 0v4.45zm-.685-6.161a.685.685 0 110-1.37.685.685 0 010 1.37z"
		          	fill="#FFF"
	        	/>
	      	</G>
	    </Svg>
  	)
}

// home profile screen
export const SearchSvg = (props) => {
  	return (
	  	
  		<Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
	      	<Defs>
		        <Path
		          	d="M10.214 3.929a6.286 6.286 0 014.966 10.14l2.661 2.661a.786.786 0 01-1.11 1.111l-2.663-2.66a6.286 6.286 0 11-3.854-11.252zm0 1.571a4.714 4.714 0 100 9.429 4.714 4.714 0 000-9.429z"
		          	id="prefix__a"
		        />
	      	</Defs>
	      	<G fill="none" fillRule="evenodd">
	        	
		        <G transform="translate(-15 -12)">
		          	
		          	<Use
			            fill={props.color != null ? props.color : '#C7C7CC'}
			            xlinkHref="#prefix__a"
			            transform="translate(12 9)"
		          	/>
		        </G>
	      	</G>
	    </Svg>
	    

  	)
}

// <Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
// 	      	<Path
// 	          	d="M13 5a8 8 0 016.32 12.905l3.387 3.388a1 1 0 01-1.414 1.414l-3.388-3.386A8 8 0 1113 5zm0 2a6 6 0 100 12 6 6 0 000-12z"
// 	          	id="prefix__a"
// 	          	fill={props.color != null ? props.color : '#C7C7CC'}
// 		        fillRule="evenodd"
// 	        />
//     	</Svg>
    	

		
// edit profile screen
export const PhotoSvg = (props) => {
  	return (
	  	<Svg width={20} height={16} viewBox="0 0 20 16" {...props}>
	      	<Path
		        d="M10 11.75a2.708 2.708 0 110-5.417 2.708 2.708 0 010 5.417zm7.917-9.167A2.083 2.083 0 0120 4.667v8.75a2.083 2.083 0 01-2.083 2.083H2.083A2.083 2.083 0 010 13.417v-8.75c0-1.15.933-2.084 2.083-2.084h3.334l.508-1.296A1.25 1.25 0 017.083.5h5.834a1.25 1.25 0 011.146.787l.52 1.296h3.334zM10 13.417a4.375 4.375 0 100-8.75 4.375 4.375 0 000 8.75z"
		        fill="#FFF"
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
		
// bookmarks screen
export const BookmarkSvg = (props) => {
	const colors = getThemedColors(useColorScheme())
  	return (
	  	<Svg width={15} height={22} viewBox="0 0 20 30" {...props}>
	      	<G fill="none" fillRule="evenodd">
		        <Path
		          	d="M16.476 28.762l-5.214-5.214a1.786 1.786 0 00-2.524 0l-5.214 5.214A1.786 1.786 0 01.476 27.5V3.69A2.976 2.976 0 013.452.714h13.096a2.976 2.976 0 012.976 2.976V27.5a1.786 1.786 0 01-3.048 1.262z"
		          	fill={ null != props.fill ? props.fill : colors.appColor}
		        />
	      	</G>
	    </Svg>
  	)
}

export const MarkerSvg = (props) => {
  	return (
  		<Svg width={14} height={20} viewBox="0 0 14 20" {...props}>
	      	<G fill="none" fillRule="evenodd">
		        <Path
		          	d="M6.624.4A7.02 7.02 0 00.04 6.616a6.892 6.892 0 001.088 4.52l5.2 8.096a.8.8 0 001.352 0l5.2-8.096A6.872 6.872 0 0014 7.36 6.984 6.984 0 006.624.4zM7 10.2a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6z"
		          	fill={props.color != null ? props.color : '#FFF'}
		        />
	      	</G>
	    </Svg>
  	)
}		
export const FilterSvg = (props) => {
  	return (
  		<Svg width={20} height={16} viewBox="0 0 20 16" {...props}>
	      	<Path
		        d="M12.917 8.832c1.44 0 2.717.925 3.166 2.293h2.875a1.042 1.042 0 010 2.083h-2.875a3.333 3.333 0 01-6.333 0H1.042a1.042 1.042 0 010-2.083H9.75a3.333 3.333 0 013.167-2.293zM7.083.5c1.44 0 2.717.925 3.167 2.293h8.708a1.042 1.042 0 010 2.083H10.25a3.333 3.333 0 01-6.333 0H1.042a1.042 1.042 0 010-2.083h2.875A3.333 3.333 0 017.083.499z"
		        fill="#000"
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const CheckMarkSvg = (props) => {
  	return (
  		<Svg width={11} height={9} viewBox="0 0 11 9" {...props}>
	      	<Path
		        d="M9.314.793a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0L.793 5.686a1 1 0 111.414-1.414l1.814 1.814L9.314.793z"
		        fill={props.color != null ? props.color : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const CatSvg = (props) => {
  	return (
  		<Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
	      	<Path
		        d="M7.619 10.952c.789 0 1.429.64 1.429 1.429v6.19c0 .79-.64 1.429-1.429 1.429H2.381A2.381 2.381 0 010 17.619v-5.238c0-.789.64-1.429 1.429-1.429h6.19zm10.952 0c.79 0 1.429.64 1.429 1.429v5.238A2.381 2.381 0 0117.619 20h-5.238c-.789 0-1.429-.64-1.429-1.429v-6.19c0-.789.64-1.429 1.429-1.429h6.19zM7.62 0c.789 0 1.429.64 1.429 1.429v6.19c0 .789-.64 1.429-1.429 1.429h-6.19C.639 9.048 0 8.408 0 7.619V2.381A2.381 2.381 0 012.381 0h5.238zm10 0A2.381 2.381 0 0120 2.381v5.238c0 .789-.64 1.429-1.429 1.429h-6.19c-.789 0-1.429-.64-1.429-1.429v-6.19c0-.79.64-1.429 1.429-1.429h5.238z"
		        fill={props.color != null ? props.color : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const LightningSvg = (props) => {
  	return (
  		<Svg width={15} height={20} viewBox="0 0 15 20" {...props}>
	      	<Path
		        d="M.958 11.25h5.417l-.596 7.85a.833.833 0 001.488.554l6.866-9.583a.833.833 0 00-.675-1.321H8.042L8.637.9A.833.833 0 007.15.346L.283 9.925a.833.833 0 00.675 1.325z"
		        fill={props.color != null ? props.color : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const PinterSvg = (props) => {
  	return (
  		<Svg width={18} height={20} viewBox="0 0 18 20" {...props}>
	      	<Path
		        d="M16.908 6.52l-3.283-3.603A1.25 1.25 0 0012.7 2.5H9.417V1.042a1.042 1.042 0 00-2.084 0V2.5H2.125c-.69 0-1.25.56-1.25 1.25v6.667c0 .69.56 1.25 1.25 1.25h5.208v7.291a1.042 1.042 0 002.084 0v-7.291H12.7a1.25 1.25 0 00.925-.417l3.283-3.613a.833.833 0 000-1.116z"
		        fill={props.color != null ? props.color : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}	
export const ChatSvg = (props) => {
  	return (
  		<Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
	      	<Path
		        d="M9.767.233a9.767 9.767 0 00-8.274 14.94L.098 18.47a.93.93 0 001.218 1.218l3.298-1.395A9.767 9.767 0 109.767.233zm-3.953 10.93a1.163 1.163 0 110-2.326 1.163 1.163 0 010 2.326zm3.953 0a1.163 1.163 0 110-2.326 1.163 1.163 0 010 2.326zm3.954 0a1.163 1.163 0 110-2.326 1.163 1.163 0 010 2.326z"
		        fill={props.fill != null ? props.fill : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}		
export const ClockSvg = (props) => {
  	return (
  		<Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
	      	<Path
		        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10A10 10 0 0010 0zm4.583 10.833h-3.75c-.92 0-1.666-.746-1.666-1.666v-5a.833.833 0 111.666 0v5h3.75a.833.833 0 110 1.666z"
		        fill={props.fill != null ? props.fill : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}	
export const SendSvg = (props) => {
  	return (
  		<Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
	      	<Path
		        d="M19.66 1.92l-6.707 16.745a1.395 1.395 0 01-2.511.158l-3.195-5.758a1.456 1.456 0 00-.545-.544L.95 9.326a1.395 1.395 0 01.158-2.512L17.847.107a1.395 1.395 0 011.813 1.814z"
		        fill={props.fill != null ? props.fill : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}	
export const SendHozSvg = (props) => {
  	return (
  		<Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
	      	<Path
		        d="M0 12c.024-.429.095-.727.214-.895.12-.168.383-.34.79-.519L10.5 9 1.003 7.414C.59 7.19.327 7 .214 6.842.102 6.684.031 6.403 0 6V1.5A1.5 1.5 0 012.245.198v.001l15.297 8.11a.75.75 0 01.087 1.339l-.086.043L2.246 17.8A1.5 1.5 0 010 16.5z"
		        fill={props.fill != null ? props.fill : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}
export const ChatProfileSvg = (props) => {
	const colors = getThemedColors(useColorScheme())
  	return (
  		<Svg width={29} height={29} viewBox="0 0 29 29" {...props}>
	      	<G fill="none" fillRule="evenodd">
		        <Rect fill={props.fill != null ? props.fill : colors.appColor} width={29} height={29} rx={6} />
		        <Path
		          	d="M18 5a6 6 0 016 6v7.8a6 6 0 01-6 6H6V11a6 6 0 016-6h6zm-.043 1.449h-5.914a4.5 4.5 0 00-4.5 4.5V23.35h10.414a4.5 4.5 0 004.5-4.5V10.95a4.5 4.5 0 00-4.5-4.5zM16.78 15.8a.837.837 0 010 1.674h-5.442a.837.837 0 010-1.674h5.442zm2.093-3.6a.837.837 0 010 1.674h-7.535a.837.837 0 010-1.674h7.535z"
		          	fill={props.color != null ? props.color : '#FFF'}
		        />
	      	</G>
	    </Svg>
  	)
}
export const EditSvg = (props) => {
  	return (
  		<Svg width={16} height={20} viewBox="0 0 16 20" {...props}>
	      	<Path
		        d="M14.327 17.96a1.02 1.02 0 110 2.04H1.673a1.02 1.02 0 010-2.04h12.654zM10.13 1.003a2.04 2.04 0 012.885 0l1.735 1.73a2.04 2.04 0 010 2.882l-7.453 7.45a2.04 2.04 0 01-.816.501l-4.768 1.498a.816.816 0 01-1.02-1.024l1.494-4.772a2.04 2.04 0 01.506-.816zm1.666 1.234a.817.817 0 00-.789.211L4.07 9.388a.816.816 0 001.143 1.15L12.151 3.6l.012.004a.817.817 0 00-.366-1.366z"
		        fill={props.color != null ? props.color : '#000'}
		        fillRule="evenodd"
	      	/>
	    </Svg>
  	)
}	
export const MapSvg = (props) => {
  	return (
  		<Svg width={20} height={16} viewBox="0 0 20 16" {...props}>
		  	<Path
			    d="M12.542.637a.833.833 0 01.375.696V12.88a.833.833 0 01-.504.767l-4.167 1.787a.833.833 0 01-1.163-.766V3.12c0-.334.198-.635.505-.767L11.754.567a.833.833 0 01.788.07zM1.775.887l3.158 1.459a.833.833 0 01.484.758V14.63a.833.833 0 01-1.184.754L.725 13.767A1.25 1.25 0 010 12.629V2.025A1.25 1.25 0 011.775.887zm13.992-.27l3.508 1.616c.443.205.726.65.725 1.138v10.604a1.25 1.25 0 01-1.775 1.138l-3.158-1.459a.833.833 0 01-.484-.758V1.37a.833.833 0 011.184-.754z"
			    fill={props.color != null ? props.color : '#000'}
			    fillRule="evenodd"
		  	/>
		</Svg>	
  	)
}
export const WifiSlash = (props) => {
  	return (
  		<Svg width={150} height={120} viewBox="0 0 640 512" {...props}>
	      	<Path 
	      		d="M36 3.51C29.1-2.01 19.03-.9 13.51 6l-10 12.49C-2.02 25.39-.9 35.46 6 40.98l598 467.51c6.9 5.52 16.96 4.4 22.49-2.49l10-12.49c5.53-6.9 4.41-16.97-2.49-22.49L36 3.51zm467.18 304.31c1.77-.6 3.67-.83 5.05-2.29l16.46-17.37c4.62-4.87 4.38-12.64-.58-17.15-47.67-43.38-105.71-68.61-165.55-76.26l144.62 113.07zm100.09-118.96c4.8 4.39 12.29 4.13 16.81-.54l16.6-17.19c4.65-4.81 4.37-12.43-.57-16.95C509.51 38.38 333.7 5.4 178.62 54.08l46.71 36.52c130.7-29.93 273.12 2.51 377.94 98.26zM3.89 154.18c-4.94 4.52-5.22 12.14-.57 16.95l16.6 17.19c4.52 4.68 12.01 4.93 16.81.54 12.72-11.62 26.16-21.97 39.9-31.74L37.34 126.4c-11.47 8.69-22.66 17.91-33.45 27.78zm112 116.83c-4.96 4.52-5.2 12.28-.58 17.15l16.46 17.37c4.46 4.71 11.81 4.95 16.62.6 19.7-17.81 41.53-31.84 64.54-42.46l-41.51-32.45c-19.55 11.03-38.28 24.09-55.53 39.79zM240 400c0 44.18 35.82 80 80 80 41.03 0 74.45-31 79.07-70.79l-107.24-83.84C261.6 336.79 240 365.77 240 400zm80-32c17.64 0 32 14.36 32 32s-14.36 32-32 32-32-14.36-32-32 14.36-32 32-32z" 
	      		fill={props.color != null ? props.color : '#000'}
	      	/>
	    </Svg>	
  	)
}

		


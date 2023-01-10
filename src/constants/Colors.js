export const regularFontFamily = 'AvenirNextLTPro-Regular';
export const mediumFontFamily = 'AvenirNextLTPro-Medium';
export const boldFontFamily = 'AvenirNextLTPro-Bold';
export const heavyFontFamily = 'AvenirNextLTPro-Heavy';

// default light colors
const colors = {
    appColor: '#4DB7FE',
    appBg: '#FFF',
    secondBg: '#F7F8FA',
    backBtn: '#000',
    replyBg: '#FFF',
    // categories colors
    redCBg: '#F75C96',
    purpCBg: '#BE31E3',
    blueCBg: '#4C97FD',
    yellowCBg: '#F8BD38',
    greenCBg: '#5ECFB1',
    orangeCBg: '#E9776D',

    shadowCl: '#D2D3D7',

    regularText: '#1E2432', // default regular text
    mediumText: '#1E2432', // default medium text
    boldText: '#1E2432', // default bold text
    heavyText: '#1E2432', // default heavy text

    hText: '#1E2432', // heading text
    tText: '#1E2432', // title text
    taxTitle: '#1E2432', // category/location text
    taxCount: '#B8BBC6', // category/location counter text
    addressText: '#B8BBC6', // address text
    pText: '#1E2432', // paragraph text

    searchText: '#C7C7CC', // text for search box
    searchBg: 'rgba(142,142,147,0.12)', // search box
    avatarIcon: '#979797', // avatar icon

    separator: '#EAECEF', // separator line
    searchIconBg: 'rgba(216,216,216,0.7)', // icon background near result title

    fieldLbl: '#BEC2CE', // input field label
    inputFocus: '#BEC2CE',

    pastDay: '#BEC2CE',
    unavailableDay: '#BEC2CE',

    lMoreText: '#8E8E93',

    buttonPrimaryBg: '#4DB7FE',

    headerNavStyle: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EAECEF',
        // height: 80,
    },
    headerTitleStyle: {
        fontFamily: boldFontFamily,
        color: '#1E2432',
        textAlign: 'center', 
        fontSize: 17, 
        fontWeight: '700',
        alignSelf: 'center',
    },
    tabBarColors : {
        activeTintColor: '#4DB7FE',
        inactiveTintColor: '#808080',
        style: {
            backgroundColor: '#F2F2F2', // '#FFF',
            borderTopColor: '#EAECEF',
        },
        labelPosition: "below-icon",
    },
    modalBg: '#00000040', // must be 6 or 8 characters color
    modalInner: '#FFF',
}

export const themedColors = {
    default: {
        ...colors,
    },
    light: {
        ...colors,
    },
    dark: {
        ...colors,
        
        // dark mode colors
        appColor: 'tomato',

        appBg: '#000',
        secondBg: '#222831',
        backBtn: '#FFF',
        replyBg: '#FFF',
        // categories colors
        redCBg: '#F75C96',
        purpCBg: '#BE31E3',
        blueCBg: '#4C97FD',
        yellowCBg: '#F8BD38',
        greenCBg: '#5ECFB1',
        orangeCBg: '#E9776D',

        shadowCl: '#222831',

        regularText: '#FFF', 
        mediumText: '#FFF', 
        boldText: '#FFF', 
        heavyText: '#FFF', 

        hText: '#FFF',
        tText: '#FFF',
        taxTitle: '#FFF',
        taxCount: '#EEE',
        addressText: '#EEE',
        pText: '#FFF',

        searchText: '#FFF',
        searchBg: '#393e46',
        avatarIcon: '#FFF',

        separator: '#393e46',
        searchIconBg: '#393e46', // '#222831',

        fieldLbl: '#EEE',
        inputFocus: '#EEE',

        pastDay: '#EEE',
        unavailableDay: '#EEE',

        lMoreText: '#FFF',

        buttonPrimaryBg: 'tomato',
        
        headerNavStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0.5,
            borderBottomColor: '#393e46',
            // height: 80,
        },
        headerTitleStyle: {
            fontFamily: boldFontFamily,
            color: '#FFF',
            textAlign: 'center', 
            fontSize: 17, 
            fontWeight: '700',
            alignSelf: 'center',
        },
        tabBarColors : {
            activeTintColor: 'tomato',
            inactiveTintColor: '#FFF',
            style: {
                backgroundColor: '#010101', // '#000',
                borderTopColor: '#272729', // '#393e46',
            },
            labelPosition: "below-icon",
        },
        modalBg: '#000000', // must be 6 or 8 characters color
        modalInner: '#222831',
    },
}

import { StyleSheet } from 'react-native'
import { Colors } from "../../../constants/Colors"
import { GutterSizes } from '../../../constants/GutterSizes'

export default StyleSheet.create({
    container: {
        width: '100%',
        padding: GutterSizes.xs
    },
    header: {
        flexDirection: "row",
        alignContent: 'center',
        padding: 4
    },
    agcHeader: {
        alignContent: 'center',
        padding: 4,
        width: '100%'
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    maintext: {
        color: Colors.DarkGray,
        fontSize: 13,
        fontStyle: "normal",
        fontWeight: "bold"
    },
    subtext: {
        color: Colors.Gray,
        fontSize: 13,
        fontStyle: "normal",
    },
    arrow: {
        alignContent: 'center',
        flexDirection: "row",
        paddingLeft: GutterSizes.md,
        paddingRight: GutterSizes.xxs
    },
    agcStyle: {
        backgroundColor: Colors.DefalutGray,
        borderRadius: 8,
        width: '100%',
        elevation: 2,
        flex: 1,
        alignItems: "center"
    },
    agctext: {
        color: Colors.Green,
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "bold",
      
    },
    headertext: {
        fontSize: 16
    },
    boldheader: {
        fontWeight: "bold"
    },
    paddingAll: {
        padding: 30
    },
    paddingButton: {
        marginTop: 15
    },
    paddingAgc: {
        padding: 15,
    },
    backgroundColor: {
        backgroundColor: Colors.DefalutGray
    },
    cardColor: {
        backgroundColor: Colors.White
    },
    











});
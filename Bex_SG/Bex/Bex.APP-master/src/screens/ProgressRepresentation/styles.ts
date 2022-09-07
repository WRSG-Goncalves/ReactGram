import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";
import { normalize } from "../../utils";

export default StyleSheet.create({
    messageBottom: {
        width: '90%',
        backgroundColor: Colors.DarkGray,
        position: 'absolute',
        zIndex: 999999,
        bottom: 70,
        alignSelf: 'center',
        padding: GutterSizes.sm
    },
    messageBottomText: {
        color: Colors.White,
        textAlign: 'center',
        fontSize: normalize(14)
    },
    modalContainer: {
        backgroundColor: Colors.White,
        borderRadius: 8,
        paddingBottom: GutterSizes.lg,
        paddingHorizontal:  GutterSizes.sm,
        alignSelf: 'center',
    },
    modalText: {
        fontSize: normalize(16),
        color: Colors.Black,
        textAlign: 'center'
    },
    modalTitle: {
        fontSize: normalize(18),
        color: Colors.Black,
        textAlign: 'center',
        fontWeight: "bold"
    },
    modalClose: {
        justifyContent: "flex-end",
        flexDirection: 'row',
        paddingTop: GutterSizes.lg / 2,
        paddingBottom: GutterSizes.sm / 2
    },
    modalButton: {
        flex: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.LightGray,
        paddingVertical: GutterSizes.sm
    },
    containerTop: {
        padding: GutterSizes.sm,
        backgroundColor: Colors.LightGray
    },
    title: {
        fontSize: normalize(18),
    },
    camIcon: {
        backgroundColor: Colors.Blue,
        justifyContent: "center",
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 100000
    },
    linkUrl: {
        color: Colors.Blue,
        fontSize: normalize(16),
    },
    greenButton: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: Colors.White,
        shadowColor: Colors.Green,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        borderColor: Colors.Green,
        borderWidth: 1,
        flex: 1,
        marginRight: GutterSizes.sm,
        borderRadius: GutterSizes.xs,
        paddingVertical: 15
    },
    emailContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.Primary,
        paddingHorizontal: normalize(GutterSizes.sm + 4),
        paddingVertical: normalize(GutterSizes.sm),
        // width: "100%",
        marginVertical: normalize(GutterSizes.xs),
        fontSize: normalize(14),
    },
    grayButton: {
       borderRadius: GutterSizes.xs,
       shadowColor: Colors.Black,
       shadowOffset: {
           width: 0,
           height: 4,
       },
       shadowOpacity: 0.32,
       shadowRadius: 5.46,
       elevation: 9,
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
       backgroundColor: Colors.White,
       flexDirection: "row",
       paddingVertical: 15
    },

    agentContainer: {
        padding: GutterSizes.sm / 2,
        backgroundColor: Colors.LightGray,
        alignItems: "center",
        flexDirection: 'row'
    },
    agentText: {
        fontWeight: "bold"
    },
    agentNumber: {
        marginVertical: GutterSizes.sm
    },
    
    agentItem: {
        padding: GutterSizes.sm,
        borderBottomColor: Colors.Black,
        borderBottomWidth: 1
    },
    agentItemTitle: {
        fontWeight: "bold"
    }
})
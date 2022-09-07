import { StyleSheet } from "react-native";
import { GutterSizes } from "../../constants/GutterSizes";
import { Colors } from "../../constants/Colors";
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
        fontSize: 14
    },
    modalContainer: {
        backgroundColor: Colors.White,
        borderRadius: 8,
        paddingBottom: GutterSizes.lg,
        paddingHorizontal:  GutterSizes.sm,
        alignSelf: 'center',
    },
    modalText: {
        fontSize: 16,
        color: Colors.Black,
        textAlign: 'center'
    },
    modalTitle: {
        fontSize: 18,
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
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: GutterSizes.md
    },
    button: {
        backgroundColor: Colors.Blue,
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttonText: {
        color: Colors.White,
        textAlign: 'center'
    },
    middletitleContainer: {
        paddingVertical: GutterSizes.sm,
        backgroundColor: Colors.White,
        marginBottom: GutterSizes.sm / 2,
    },
    middleTitleText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    endContainer: {
        backgroundColor: Colors.White,
        marginVertical: GutterSizes.md,
        paddingVertical: GutterSizes.sm,
    },
    endTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: GutterSizes.sm,
        marginBottom: GutterSizes.xs
    },
    endDate: {
        textAlign: 'center',
    },
    endDescription: {
        textAlign: 'center',
        paddingHorizontal: GutterSizes.lg,
        marginTop: GutterSizes.sm
    },
    flatContainer: { 
        maxHeight: 320
    },
    container: {
        padding: GutterSizes.sm
    },
    title: {
        fontSize: 18,
        fontWeight: '500'
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: Colors.White,
        padding: GutterSizes.sm,
        paddingHorizontal: GutterSizes.md,
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    creditorTextTitle: {
        fontWeight: 'bold',
        marginLeft: GutterSizes.lg
    },
    link: {
        color: Colors.Blue,
        textDecorationLine: 'underline'
    },
    representationInputContainer: {
        backgroundColor: Colors.White,
        paddingVertical: GutterSizes.sm,
        paddingHorizontal: GutterSizes.md
    },
    representationInput: {
        padding: GutterSizes.xs,
        borderColor: Colors.Gray,
        borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    representationInputText: {
        color: Colors.Gray,
        marginLeft: GutterSizes.sm
    }
})
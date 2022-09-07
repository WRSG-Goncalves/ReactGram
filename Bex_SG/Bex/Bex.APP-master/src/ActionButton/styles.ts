import { StyleSheet } from "react-native";
import { GutterSizes } from "../constants/GutterSizes";
import { Colors } from "../constants/Colors";

export default StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        width: '100%',
        paddingHorizontal: 5,
        paddingVertical: GutterSizes.sm,
        borderRadius: 5,
        borderColor: '#AAA',
        borderWidth: 1,
        backgroundColor: Colors.White
    },
    successButton: {
        backgroundColor: Colors.Green
    },
    dangerButton: {
        backgroundColor: Colors.Red
    },
    text: {
        color: Colors.DarkGray
    },
    successText: {
        color: Colors.White
    },
    dangerText: {
        color: Colors.White
    }
})
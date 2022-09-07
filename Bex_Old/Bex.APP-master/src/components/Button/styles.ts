import { StyleSheet } from "react-native";
import { GutterSizes } from "../../constants/GutterSizes";
import { normalize } from "../../utils";
import { Colors } from "../../constants/Colors";

export default StyleSheet.create({
    button: {
        marginVertical: GutterSizes.sm,
        paddingVertical: GutterSizes.md,
        borderRadius: normalize(5),
        width: "100%",
        backgroundColor: Colors.Secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        marginHorizontal: GutterSizes.xs,
        color: Colors.LightGray,
        fontSize: normalize(20),
    },

})
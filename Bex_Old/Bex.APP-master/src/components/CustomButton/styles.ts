import { StyleSheet } from "react-native";
import { GutterSizes } from "../../constants/GutterSizes";
import { normalize } from "../../utils";
import { Colors } from "../../constants/Colors";

export default StyleSheet.create({
    button: {
        marginVertical: GutterSizes.sm,
        paddingVertical: GutterSizes.md,
        paddingHorizontal: GutterSizes.sm,
        borderRadius: normalize(5),
        backgroundColor: Colors.Secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        marginHorizontal: GutterSizes.xs,
        color: Colors.LightGray,
        fontSize: normalize(20),
    },

})
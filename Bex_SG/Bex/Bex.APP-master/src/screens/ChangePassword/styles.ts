import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";
import { normalize } from "../../utils";

const styles = StyleSheet.create({
    button: {
        marginVertical: GutterSizes.sm,
        paddingVertical: GutterSizes.xs,
        borderRadius: normalize(5),
        width: "100%",
        backgroundColor: Colors.Secondary,
    },
    buttonText: {
        marginHorizontal: GutterSizes.xs,
        color: Colors.LightGray,
        fontSize: normalize(20),
    },
})

export default styles;
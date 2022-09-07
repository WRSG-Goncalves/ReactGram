import { StyleSheet } from "react-native"
import { Colors } from "../../constants/Colors"
import { GutterSizes } from "../../constants/GutterSizes"

export default StyleSheet.create({

    container:{
        backgroundColor: Colors.White,
        width: "100%",
        paddingHorizontal: GutterSizes.sm,
        paddingVertical: GutterSizes.sm
    },
    header:{
        padding: 5
    },
    titleText:{
        fontSize: 25,
    }


})
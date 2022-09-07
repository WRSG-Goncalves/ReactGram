import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";



export default StyleSheet.create({

    separator: {
        height: 1,
        backgroundColor: Colors.LightGray,
        width: '100%'
    },
    container: {
        width: '100%',
        padding: GutterSizes.xs,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    cardColor: {
        backgroundColor: Colors.White
    },
    headertext: {
        fontSize: 16,
        marginBottom: 4
        
    },
    boldheader: {
        fontWeight: "bold"
    },

})
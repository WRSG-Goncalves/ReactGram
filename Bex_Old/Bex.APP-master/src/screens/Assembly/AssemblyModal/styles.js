import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import { GutterSizes } from "../../../constants/GutterSizes";
import { normalize } from "../../../utils";

const styles = StyleSheet.create({
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
})

export default styles;
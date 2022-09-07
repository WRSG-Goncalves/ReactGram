import { StyleSheet } from 'react-native'
import { Colors } from "../../../constants/Colors"
import { GutterSizes } from '../../../constants/GutterSizes'

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        padding: GutterSizes.sm,
        marginBottom: GutterSizes.xxs
    },
    title: {
        fontWeight: 'bold'
    },
    normal: {
        fontWeight: 'normal'
    }
})
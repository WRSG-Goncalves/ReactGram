import { StyleSheet } from 'react-native'
import { GutterSizes } from '../../constants/GutterSizes'

export default StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: GutterSizes.xs,
        paddingVertical: GutterSizes.xs
    },
    maintext: {
        fontSize: 17,
    },
    subtext: {
        fontSize: 15,
        paddingVertical: 8
    },
    profileimage: {
        width: 75,
        height: 75,
    },
})
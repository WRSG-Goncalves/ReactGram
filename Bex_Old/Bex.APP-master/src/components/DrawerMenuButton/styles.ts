import { StyleSheet, Platform, I18nManager } from "react-native";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        ...Platform.select({
            ios: null,
            default: {
                marginVertical: 3,
                marginHorizontal: 11,
            },
        }),
    },
    icon: Platform.select({
        ios: {
            height: 21,
            width: 13,
            marginLeft: 8,
            marginRight: 22,
            marginVertical: 12,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
        },
        default: {
            height: 24,
            width: 24,
            margin: 3,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
        },
    })

})
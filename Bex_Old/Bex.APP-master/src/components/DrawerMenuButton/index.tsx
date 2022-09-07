import React, { FunctionComponent } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from '../Icon'
import { View } from 'react-native'
import styles from './styles'
import { Colors } from '../../constants/Colors'

const DrawerMenuButton: FunctionComponent<{
    onPress(): void
}> = ({ onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Icon name="menu" size={21} color={Colors.Secondary} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default DrawerMenuButton
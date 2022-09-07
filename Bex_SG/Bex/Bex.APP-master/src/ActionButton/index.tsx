import React, { FunctionComponent } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styles from './styles'
import { ActionButtonProps } from './interfaces'
import GlobalStyles from '../styles/GlobalStyles'
import Icon from '../components/Icon'
import { Colors } from '../constants/Colors'

const ActionButton: FunctionComponent<ActionButtonProps> = ({ icon, onPress, type, children }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, type === 'danger' ? styles.dangerButton : {}, type === 'success' ? styles.successButton : {}]}>
                {
                    icon && (
                        <View style={GlobalStyles.marginRightXs}>
                            <Icon name={icon} size={14} color={type === 'danger' || type === 'success' ? Colors.White : Colors.DarkGray} />
                        </View>
                    )
                }
                <Text style={[styles.text, type === 'danger' ? styles.dangerText : {}, type === 'success' ? styles.successText : {}]}>
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

ActionButton.defaultProps = {
    type: 'default'
}

export default ActionButton
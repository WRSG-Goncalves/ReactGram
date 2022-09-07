import React, { FunctionComponent } from 'react'
import { TouchableOpacityProps, TouchableOpacity, Text, View } from 'react-native'
import { ButtonProps } from './interfaces'
import GlobalStyles from '../../styles/GlobalStyles'
import Icon from '../Icon'
import styles from './styles'

const CustomButton: FunctionComponent<TouchableOpacityProps & ButtonProps> = ({ children, icon, iconColor, style,...props }) => {

    return (
        <TouchableOpacity {...props} style={[styles.button, style ? style : {}]}>
            {
                icon && (
                    <View style={GlobalStyles.marginRightXs}>
                        <Icon name={icon} size={14} color={iconColor} />
                    </View>
                )
            }
            <Text style={styles.buttonText}>
                {children}
            </Text>
        </TouchableOpacity>
    )

}

export default CustomButton
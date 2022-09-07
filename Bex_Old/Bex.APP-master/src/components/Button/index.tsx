import React, { FunctionComponent } from 'react'
import { TouchableOpacityProps, TouchableOpacity, Text } from 'react-native'
import { ButtonProps } from './interfaces'
import styles from './styles'

const Button: FunctionComponent<TouchableOpacityProps & ButtonProps> = ({ children, icon, ...props }) => {

    return (
        <TouchableOpacity {...props} style={styles.button}>
            {icon}
            <Text style={styles.buttonText}>
                {children}
            </Text>
        </TouchableOpacity>
    )

}

export default Button
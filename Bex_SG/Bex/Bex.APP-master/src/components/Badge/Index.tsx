import React, { FunctionComponent } from 'react'
import styles from './styles'
import { View, Text } from 'react-native'
import { BadgeProps } from './interfaces'

const Badge: FunctionComponent<BadgeProps> = ({ children, color, textColor }) => {
    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={textColor ? { color: textColor } : styles.text}>
                {children}
            </Text>
        </View>
    )
}

export default Badge
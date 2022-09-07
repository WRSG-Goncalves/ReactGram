import React, { FunctionComponent } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { Colors } from '../../constants/Colors'

const prefix = Platform.select({
    ios: 'ios',
    android: 'md'
})

const Icon: FunctionComponent<{
    name: string
    size?: number
    color?: Colors | string
}> = ({ name, size, color }) => {
    return (
        <Ionicons name={`${prefix}-${name}`} size={size} color={color} />
    )
}

export default Icon
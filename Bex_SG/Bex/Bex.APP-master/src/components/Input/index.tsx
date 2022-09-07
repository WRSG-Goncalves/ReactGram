import React, { useRef, FunctionComponent, LegacyRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styles from './styles'

const Input: FunctionComponent<{
    error?: boolean
    onSubmitEditing(name: string): any,
    ref?: LegacyRef<any>,
    name?: string
} & TextInputProps> = React.forwardRef(({ error, onSubmitEditing, name, ...props }, ref) => {

    return (
        <TextInput ref={ref} onSubmitEditing={() => onSubmitEditing(name)} style={[styles.container, error ? styles.error : {}]} {...props} />
    )
});

Input.defaultProps = {
    error: false,
}

export default Input
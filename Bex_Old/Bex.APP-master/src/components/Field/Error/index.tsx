import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'
import styles from './styles'

const Error: FunctionComponent<{

}> = ({ children }) => {
    return (
        <Text style={styles.text}>
            {children}
        </Text>
    )
}

export default Error
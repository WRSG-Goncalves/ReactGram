import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native'
import { RepresentationItemProps } from './interfaces'
import styles from './styles'
import GlobalStyles from '../../../styles/GlobalStyles'
import { monetize } from '../../../utils'

const RepresentationItem: FunctionComponent<RepresentationItemProps> = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item?.CredorNome}</Text>
            <View style={[GlobalStyles.row, GlobalStyles.justifySpaceBetween]}>
                <Text style={styles.title}>Classe: <Text style={styles.normal}>{item?.CredorClasse}</Text></Text>
                <Text style={styles.title}>Crédito: <Text style={styles.normal}>{monetize(item?.CredorValor)}</Text></Text>
            </View>
        </View>
    )
}

export default RepresentationItem
import React, { FunctionComponent, useState, useEffect } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { useQuery } from 'react-apollo'
import { GetProcessResponse, GetProcessVariables } from './interfaces'
import { GET_PROCESS } from './graphql'
import { Process } from '../../interfaces/Process'
import GlobalStyles from '../../styles/GlobalStyles'
import styles from './styles'

const ProcessDetails: FunctionComponent = () => {
    const [process, setProcess] = useState<Process>(null)

    const { params } = useRoute()

    const { data, loading } = useQuery<GetProcessResponse, GetProcessVariables>(GET_PROCESS, {
        variables: {
            id: params['id']
        }
    })

    useEffect(() => {
        if (data) {
            setProcess(data.process)
        }
    }, [data])

    if (loading) {
        return (
            <View style={GlobalStyles.marginTopSm}>
                <ActivityIndicator />
            </View>
        )
    }

    return (


        <View style={(styles.container)}>
        </View>


    )
}

export default ProcessDetails
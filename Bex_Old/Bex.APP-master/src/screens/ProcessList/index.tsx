import React, { FunctionComponent, useState, useEffect, useContext } from 'react'
import { FlatList, View, ActivityIndicator, Text, RefreshControl } from 'react-native'
import GlobalStyles from '../../styles/GlobalStyles'
import ListItem from './ListItem'
import styles from './styles'
import { UserContext } from '../../contexts/UserContext'
import { Process } from '../../interfaces/Process'
import api from '../../services/api'
import { showAlertMessage } from '../../utils'

const ProcessList: FunctionComponent = () => {
    const [processes, setProcesses] = useState<Process[]>([])
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(false);

    const loadProcesses = async () => {
        setLoading(true);
        try {
            const { status, data } = await api.post('/processos', {userId: user?.id})
            if (status === 200) {
                setProcesses(data?.recordset)
            }
        } catch (e) {
            showAlertMessage('Erro ao carregar processos!', 'danger')
        }
        setLoading(false);
    }

    // const [loadProcesses, {data, loading}] = useLazyQuery<GetProcessesResponse>(GET_PROCESSES, {fetchPolicy: 'network-only'})

    useEffect(() => {
        if (user?.id) {
            loadProcesses();
        }
    }, [user?.id])

    // const verifyAccess = (): Array<Process> => {
    //     const access = []
    //     for(const process of processes){
    //         if(process?.assemblies?.length > 0){
    //             access.push(process)
    //             // loop1:
    //             // for (const assembly of process?.assemblies) {
    //             //     for (const creditor of assembly?.creditors) {
    //             //         for (const representation of creditor?.representations) {
    //             //             if(representation?.userId == user?.id){
    //             //                 if (representation?.authorized) {
    //             //                     access.push(process)
    //             //                     break loop1
    //             //                 }
    //             //             }
    //             //         }
    //             //     }
    //             //     break loop1
    //             // }
    //         } 
    //     }
    //     return access
    // }

    return (
        <View>
            <View>
                <View style={[styles.container, GlobalStyles.paddingBot, styles.cardColor]}>
                    <View style={[GlobalStyles.row, GlobalStyles.marginLeftMd]}>
                        <Text style={[styles.headertext]} >
                            Olá
                            <Text style={[styles.headertext, styles.boldheader]}>
                                {' ' + user?.fullName}!
                            </Text>
                        </Text>
                    </View>
                    <Text style={[GlobalStyles.marginLeftMd]}>
                        Acesse aqui os Processos adicionados à sua conta
                    </Text>
                </View>
            </View>
            <View style={{ marginBottom: 150 }}>
                {loading ? <ActivityIndicator style={GlobalStyles.marginTopSm} /> : (
                    <FlatList
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadProcesses} />}
                        ListFooterComponent={loading ? <ActivityIndicator style={GlobalStyles.marginTopSm} /> : null}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        data={processes}
                        renderItem={({ item: process }) => <ListItem process={process} />}
                        keyExtractor={process => process?.Id?.toString()}
                    />
                )}
            </View>
        </View>
    )
}

export default ProcessList
import React, { FunctionComponent, useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator, Text, ScrollView, RefreshControl, TouchableOpacity, FlatList } from 'react-native'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/core'
import { useLazyQuery, useQuery } from 'react-apollo'
import { GetAssemblyVariables, GetPAssemblyResponse } from './interfaces'
import { GET_ASSEMBLY } from './graphql'
import styles from './styles'
import api from '../../services/api'
import { showAlertMessage, sortAlphabetically } from '../../utils/index'
import { Assembly as AssemblyInterface } from '../../interfaces/Assembly'
import { Colors } from '../../constants/Colors'
import GlobalStyles from '../../styles/GlobalStyles'
import moment from 'moment'
import * as Linking from 'expo-linking'
import { Creditor } from '../../interfaces/Creditor'
import Icon from '../../components/Icon'
import RepresentationItem from './RepresentationItem/index'
import CountDown from 'react-native-countdown-component';
import 'moment/locale/pt-br';
import { UserContext } from '../../contexts/UserContext'
import Modal from 'react-native-modal'
import { Feather } from '@expo/vector-icons';
import AssemblyModal from './AssemblyModal';

export type EndType = 'finalizada' | 'cancelada' | 'repEncerrada' | null
/*
Aguardando - 0
Aguardando Quorum - 1
Iniciada - 2
Finalizada - 3
Cancelada - 4
Finalizar Representação - 5
*/

/*
Garantia Real = 2
ME e EPP = 1
Quirografarios = 3
Trabalhista = 0
*/
const Assembly: FunctionComponent = ({ }) => {
    const translateClass = {
        0: "Trabalhista",
        1: "ME e EPP",
        2: "Garantia Real",
        3: "Quirografarios"
    }

    const isFocused = useIsFocused();
    const [assembly, setAssembly] = useState<AssemblyInterface>(null)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [endAssembly, setEndAssembly] = useState<EndType>(null);

    const [loadingList, setLoadingList] = useState<boolean>(false);
    const [votingData, setVotingData] = useState(null);
    const [creatorList, setCreatorList] = useState([])
    const [creatorLoading, setCreatorLoading] = useState(false)
    const [noCreator, setNoCreator] = useState(false)
    const [bottomMessage, setBottomMessage] = useState(false)

    const { navigate, addListener } = useNavigation()

    const { params } = useRoute()
    const { user } = useContext(UserContext)

    const [loadAssembly, { loading, data }] = useLazyQuery<GetPAssemblyResponse, GetAssemblyVariables>(
        GET_ASSEMBLY,
        { 
            variables: {
                id: params?.['id']
            },
           fetchPolicy: 'network-only',
        }
    );


    let reloadAssembly = null

    const AGCVoting = async () => {
        setLoadingList(true)
        try {
            const { data:agcData, status } = await api.post('/agc-iniciar-votacao', {
                assemblyId: params['id'],
                userId: user?.id,
            })
            if(status === 200){
                setVotingData(agcData?.recordset)
            }
        } catch(err) {
            console.log('error', err)
        }
        setLoadingList(false);
    }

    useEffect(() => {
        loadAssembly();
        AGCVoting();
    }, [])

    useEffect(() => {
        if (data && !loadingList) {
            setAssembly(data?.assembly)

            if(Number(data?.assembly?.status) === 3){
                setEndAssembly('finalizada')
            }
            if(Number(data?.assembly?.status) === 4){
                setEndAssembly('cancelada')
            }
            if(Number(data?.assembly?.status) === 5){
                setEndAssembly('repEncerrada')
            }

            if(Number(data?.assembly?.status) === 0 || (Number(data?.assembly?.status) === 3 && !votingData?.length) || (Number(data?.assembly?.status) === 5 && !votingData?.length)){
                setDisabled(true)
            } else {
                if (Number(data?.assembly?.status) === 1 || Number(data?.assembly?.status) === 2) {
                    setDisabled(false)
                } else {
                    setDisabled(get_seconds_between_dates(new Date(), new Date(assembly?.date)) > 0)
                }
            }
            if(Number(data?.assembly?.status) !== 0 && Number(data?.assembly?.status) !== 1)
                clearInterval(reloadAssembly)
        }
    }, [data, loadingList, votingData])

    const loadCreator = async () => {
        setCreatorLoading(true)
        try {
            const { status, data } = await api.post('/representacao-credor-usuario', {
                "processId": params['processId'],
                "userId": user?.id
            })

            if (status === 200) {
                setCreatorList(sortAlphabetically(data?.recordset, 'CredorNome')?.map((e) => ({...e, CredorClasse: translateClass?.[e?.CredorClasse]})))
                if(data?.recordset?.length === 0){
                    setNoCreator(true)
                }
                setCreatorLoading(false)
            }
        } catch (error) {
            console.log('error',error)
            showAlertMessage('Erro ao carregar listagem!', 'danger')
        }
        setCreatorLoading(false)
    }

    console.log(creatorList)

    useEffect(() => {
        if(user){
            loadCreator();
        }
    }, [user])

    const noCreatorStarted = (noCreator && Number(assembly?.status) === 2)

    useEffect(() => {
        if(noCreatorStarted){
            setTimeout(() => {
                setBottomMessage(false)
            }, 5000)
        }
    }, [noCreatorStarted])

    const getProcessStatus = (): string => {
        switch (Number(assembly.status)) {
            case 0: {
                return 'Aguardando'
            }
            case 1: {
                return 'Aguardando Quorum'
            }
            case 2: {
                return 'Iniciada'
            }
            case 3: {
                return 'Finalizado'
            }
            case 4: {
                return 'Cancelada'
            }
            case 5: {
                return 'Finalizar Representação'
            }
            default: {
                return 'Status Inválido'
            }
        }
    }

    const getLink = (): string => {
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        
        const substring = assembly.urlStreaming?.match(urlRegex);

        return substring?.[0]
    }

    const openLink = (): void => {
        Linking.openURL(getLink())
    }


    const getFirstDate = (creditor: Creditor): string => {
        creditor.representations.sort((a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix())

        return creditor.representations.length > 0 ? moment(creditor.representations[0].createdAt).format('DD/MM/YYYY - HH:mm') : '-'
    }

    const get_seconds_between_dates = (date: Date, dateTo: Date) => {
        if(date.getTime() < dateTo.getTime()){
            const dif = date.getTime() - dateTo.getTime();
            const Seconds_from_T1_to_T2 = dif / 1000;
            return Math.abs(Seconds_from_T1_to_T2);
        }
        return 0
    }

    const isLoading = loading || loadingList

    if (isLoading) {
        return (
            <View style={[GlobalStyles.marginTopSm]}>
                <ActivityIndicator />
            </View>
        )
    }

    if (assembly)
        return (
            <ScrollView style={{minHeight: '100%'}} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => {
                    loadAssembly();
                    AGCVoting();
                }} />}>
                <Modal
                    isVisible={noCreator}
                    onBackButtonPress={() => setNoCreator(false)}
                    onBackdropPress={() => setNoCreator(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalClose}>
                            <TouchableOpacity onPress={() => setNoCreator(false)}>
                                <Icon name="close" size={25} color={Colors.Black}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[GlobalStyles.row, GlobalStyles.justifyCenter, GlobalStyles.marginBotSm]}>
                            <Feather name="alert-circle" size={50} color={Colors.Black} />
                        </View>
                        <Text style={styles.modalText}>
                            Você não possui credores para representar
                        </Text>
                    </View>
                </Modal>
            <AssemblyModal handleClose={() => setEndAssembly(null)} type={isFocused ? endAssembly : null} />
            {bottomMessage && 
            <View style={[styles.messageBottom]}>
                <Text style={styles.messageBottomText}>
                    Sua representação já foi efetuada, retorne para a Assembleia
                </Text>
            </View>}
                <View style={styles.container}>
                    <Text>{assembly?.title || 'Assembleia'}</Text>
                    <View style={[styles.buttonContainer, styles.shadow]}>
                        <TouchableOpacity style={[styles.button, GlobalStyles.marginRightSm]} onPress={() => Linking.openURL('https://drive.google.com/file/d/1HGXusBofqP4hthajOrQZLRa2S9cvOI5-/view?usp=sharing')}>
                            <Text style={styles.buttonText}>Vídeo{'\n'}APP BEX</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://drive.google.com/file/d/1rznp2a6TWoUqFGTxEwHjDGpfSdh9g_mL/view?usp=sharing')}>
                            <Text style={styles.buttonText}>Manual{'\n'}APP BEX</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.middletitleContainer, styles.shadow]}>
                        <Text style={styles.middleTitleText}>Minhas representações</Text>
                    </View>
                    <View style={[styles.shadow, styles.flatContainer]} >
                        {!noCreator &&
                            <FlatList
                                nestedScrollEnabled
                                ListFooterComponent={creatorLoading ? <ActivityIndicator style={GlobalStyles.marginTopSm} /> : null}
                                data={creatorList || []}
                                renderItem={({item}) => <RepresentationItem item={item} />}
                                keyExtractor={(item, index) => item?.Id?.toString() || index}
                            />
                        }
                    </View>

                    <View style={styles.endContainer}>
                        <Text style={styles.endTitle}>Início do Credenciamento</Text>
                        <CountDown
                            size={30}
                            onFinish={() => {
                                // if(assembly){
                                //     if(Number(assembly?.status) !== 0 && Number(assembly?.status) !== 5){
                                //         setDisabled(false)
                                //     }
                                // }
                            }}
                            until={get_seconds_between_dates(new Date(), new Date(assembly?.date))}
                            digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: Colors.Transparent}}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{m: null, s: null}}
                            showSeparator
                        />
                        <Text style={styles.endDate}>{moment(assembly?.date).format('LL')} - {moment(new Date(assembly?.date)).format('HH:mm')}</Text>
                        <Text style={styles.endDescription}>Por favor, aguarde o horário de início do credenciamento e clique no botão Assembleia</Text>
                    </View>

                    <TouchableOpacity style={[styles.button ,disabled ? { } : { backgroundColor: Colors.Green }]}
                        disabled={disabled || noCreatorStarted}
                        onPress={async () => {
                            if(!noCreator && (Number(assembly?.status) === 1 || Number(assembly?.status) === 2)){
                                navigate('Representation', {id: params['id'], processId: params['processId']})
                            } else {
                                navigate('ProgressRepresentation', {id: params['id'], processId: params['processId']})
                            }
                        }}
                    >   
                        {!noCreator && (Number(assembly?.status) === 2 || Number(assembly?.status) === 5) ? 
                            <Text style={styles.buttonText}>Retornar para Assembleia</Text>
                        :
                            <Text style={styles.buttonText}>Assembleia</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )

    return <></>
}

export default Assembly
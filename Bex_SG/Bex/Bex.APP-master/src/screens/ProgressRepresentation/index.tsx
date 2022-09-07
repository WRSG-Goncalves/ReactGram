import React, { FunctionComponent, useState, useEffect, useContext, useRef } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, ScrollView, RefreshControl, TextInput, Alert, Platform } from 'react-native'
import queryString from 'query-string';
import GlobalStyles from '../../styles/GlobalStyles'
import { Colors } from "../../constants/Colors";
import Badge from '../../components/Badge/Index'
import api from '../../services/api'
import styles from './styles'
import Icon from '../../components/Icon'
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment'
import 'moment/locale/pt-br';
import { showAlertMessage, sortAlphabetically } from '../../utils/index'
import { monetize } from '../../utils/index'
import { GetAssemblyVariables, GetPAssemblyResponse } from './interfaces'
import { Assembly as AssemblyInterface } from '../../interfaces/Assembly'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useQuery, useLazyQuery } from 'react-apollo'
import { GET_ASSEMBLY } from './graphql'
import { UserContext } from '../../contexts/UserContext'
import Modal from 'react-native-modal'
import FlashMessage from 'react-native-flash-message';

const ProgressRepresention: FunctionComponent<{}> = ({ }) => {
    const flashRef = useRef(null);
    const [assembly, setAssembly] = useState<AssemblyInterface>(null)
    const [bottomMessage, setBottomMessage] = useState(false)
    const { navigate, addListener } = useNavigation()
    const [creatorList, setCreatorList] = useState([])
    const [endAssembly, setEndAssembly] = useState(false)

    const [sendEmail, setSendEmail] = useState(false)
    const [sendEmailLoadng, setSendEmailLoading] = useState(false)
    const [sendEmailSuccess, setSendEmailSuccess] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)
    const [creatorLoading, setCreatorLoading] = useState(false)
    const [votacaoAtualLoading, setVotacaoAtualLoading] = useState(false)
    const [voteNumber, setVoteNumber] = useState<string | number>('');
    const [email, setEmail] = useState(null)

    const [checkEmail, setCheckEmail] = useState(false)
    const [checkEmailLoading, setCheckEmailLoading] = useState(false)

    const [messageIndex, setMessageIndex] = useState(0)

    const { params } = useRoute()
    const { user } = useContext(UserContext)

    const [loadAssembly, { loading, data }] = useLazyQuery<GetPAssemblyResponse, GetAssemblyVariables>(
        GET_ASSEMBLY,
        {
            variables: {
                id: params['id']
            },
            fetchPolicy: 'network-only',
        }
    );

    let reloadAssembly = null

    useEffect(() => {
        loadVotacaoAtual();
        loadAssembly()
        const unsubscribe = addListener('focus', () => {
            if (user) {
                loadCreator()
            }
        });

        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (data) {
            setAssembly(data?.assembly)
            if (Number(data?.assembly?.status) === 3) {
                setEndAssembly(true)
            }
        }
    }, [data])

    const loadCreator = async () => {
        try {
            setCreatorLoading(true)
            const { status, data } = await api.post('/agc-comprovante-app', {
                "assemblyId": params['id'],
                "userId": user?.id
            })
            if (status === 200) {
                setCreatorList(sortAlphabetically(data?.recordset, 'Credor'))
                setCreatorLoading(false)
            } else {
                showAlertMessage('Erro ao carregar listagem!', 'danger')
                setCreatorLoading(false)
            }
        } catch (e) {
            showAlertMessage('Erro ao carregar listagem!', 'danger')
            setCreatorLoading(false)
        }
    }

    const loadVotacaoAtual = async () => {
        setVotacaoAtualLoading(true);
        try {
            const { status, data } = await api.post('/agc-votacao-atual', { "assemblyId": params['id'] })
            if (status === 200) {
                const votacaoAtual = data?.recordset?.[0]?.VotacaoAtual;
                setVoteNumber(votacaoAtual === 1 ? '' : votacaoAtual)
            } else {
                showAlertMessage('Erro ao carregar votação atual!', 'danger')
            }
        } catch (e) {
            showAlertMessage('Erro ao carregar votação atual!', 'danger')
        }
        setVotacaoAtualLoading(false);
    }

    const sendEmailApi = async () => {
        try {
            setSendEmailLoading(true)
            const send = {
                "assemblyId": params['id'],
                "userId": user?.id,
                "voto": voteNumber
            }
            if (email) {
                send['email'] = email
            }
            const { status } = await api.post('/enviar-comprovante-email', send)

            if (status === 200) {
                setSendEmailLoading(false)
                setSendEmailSuccess(true)
                setCheckEmail(true)
            } else {
                flashRef.current?.showMessage({
                    message: 'Erro ao enviar o comprovante!',
                    type: 'danger',
                });
                setSendEmailLoading(false)
                setSendEmailSuccess(false)
            }
        } catch (e) {
            flashRef.current?.showMessage({
                message: 'Erro ao enviar o comprovante!',
                type: 'danger',
            });
            setSendEmailLoading(false)
            setSendEmailSuccess(false)
        }
    }

    const checkEmailApi = async () => {
        try {
            setCheckEmailLoading(true)
            const { status, data } = await api.post('/check-comprovante-email', {
                "email": user?.email,
                "assemblyId": params['id'],
                "userId": user?.id,
                "voto": voteNumber
            })
            if (status === 200) {
                setCheckEmailLoading(false)
                data?.recordset?.forEach(item => {
                    if (item?.Email === user?.email && item?.Voto === voteNumber) {
                        setCheckEmail(true)
                    }
                })
            } else {
                flashRef.current?.showMessage({
                    message: 'Erro ao verificar o comprovante!',
                    type: 'danger',
                });
                setCheckEmailLoading(false)
                setCheckEmail(false)
            }
        } catch (e) {
            flashRef.current?.showMessage({
                message: 'Erro ao verificar o comprovante!',
                type: 'danger',
            });
            setCheckEmailLoading(false)
            setCheckEmail(false)
        }
    }

    useEffect(() => {
        setCheckEmail(false);
        setSendEmailLoading(false);
        setSendEmailSuccess(false);

        checkEmailApi()
    }, [voteNumber])

    useEffect(() => {
        if (user) {
            loadCreator()
        }
    }, [user])

    useEffect(() => {
        if (bottomMessage) {
            setTimeout(() => {
                setBottomMessage(false)
            }, 2500)
        }
    }, [bottomMessage])

    const openStore = () => {
        try {
            Linking.openURL(Platform.OS.toLowerCase() == 'ios' ? 'itms-apps://itunes.apple.com/app/zoom-cloud-meetings/id546505307' : 'market://details?id=us.zoom.videomeetings')
        } catch (e) {
            Alert.alert('Erro', 'Erro ao abrir loja.')
        }
    }

    const handlePress = async () => {
        if (assembly?.urlStreaming) {
            try {
                const url = getUrl();
                const params = url?.slice(url?.indexOf("?"))
                const parsed = queryString.parse(params);

                const deepLink = `zoomus://zoom.us/join?confno=${parsed.mn}&pwd=${parsed.pwd}&zc=0&browser=chrome&uname=${parsed.name}`;

                const canOpen = await Linking.canOpenURL(deepLink)
                if (!canOpen) {
                    Alert.alert('Atenção', 'Não foi possível localizar o Zoom em seu aparelho, é necessário instalar para participar da Assembleia. Deseja baixá-lo?', [{ text: 'Sim', onPress: openStore, style: 'default' }, { text: 'Não', style: 'cancel' }], { cancelable: false })
                } else {
                    Linking.openURL(deepLink);
                }
            } catch (e) {
                console.log(e)
                Alert.alert('Erro ao abrir aplicativo Zoom.')
            }
        }
    };

    const getProcessStatus = (): string => {
        switch (Number(assembly?.status)) {
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

    const getUrl = (): string => {
        if (assembly) {
            var regex = /<iframe.*?src="(.*?)"/;
            var regexSingle = /<iframe.*?src='(.*?)'/;
            var src = regex.exec(assembly?.urlStreaming)?.[1];
            if (src) {
                return src?.replace('[Name]', user?.fullName)
            } else {
                return regexSingle.exec(assembly?.urlStreaming)?.[1]?.replace('[Name]', user?.fullName);
            }
        }
        return ''
    }

    const representationButtonColor = (): string => {
        if (Number(assembly?.status) === 2 || Number(assembly?.status) === 3 || Number(assembly?.status) === 5) {
            return Colors.Red
        }
        return Colors.White
    }

    const representationTextColor = (): string => {
        if (Number(assembly?.status) === 2 || Number(assembly?.status) === 3 || Number(assembly?.status) === 5) {
            return Colors.White
        }
        return Colors.Black
    }

    const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    const messageFromIndex = () => {
        switch (messageIndex) {
            case 0:
                return 'Sua representação já foi efetuada, aguarde o início da Assembleia'
            case 1:
                return 'Sua votação foi realizada com sucesso!'
            case 2:
                return 'Seu comprovante de votação foi enviado  via email'
            default:
                return ''
        }
    }

    const styleVotoColor = (val) => {
        let color = 'black';
        if (val === 'Reprovado') {
            color = Colors.Red
        }
        if (val === 'Aprovado') {
            color = Colors.Green
        }
        if (val === 'Abstém') {
            color = Colors.Yellow
        }
        return { color, fontWeight: 'bold' }
    }

    const renderVotacoesButton = () => {
        const hasVottedLast = creatorList?.filter(e => e?.[`Voto${voteNumber}`])?.length > 0

        const voteColor = () => {
            if (Number(assembly?.status) === 2) {
                return hasVottedLast ? Colors.Black : Colors.White
            }
            return Colors.Gray;
        }
        const voteText = hasVottedLast ? 'Votação realizada' : 'Realizar votos'

        const doVoteButtonColor = (): object => {
            if (hasVottedLast) {
                return { backgroundColor: Colors.White, borderColor: Colors.Green, borderWidth: 1 }
            }

            if (Number(assembly?.status) === 2) {
                return { backgroundColor: Colors.Green }
            }

            return { backgroundColor: Colors.White }
        }

        return (
            <TouchableOpacity
                style={[styles.grayButton, doVoteButtonColor()]}
                onPress={() => {
                    if (!(Number(assembly?.status) === 0 || Number(assembly?.status) === 1 || (Number(assembly?.status) === 2 && hasVottedLast))) {
                        if (Number(assembly?.status) === 2) {
                            navigate('Voting', { id: params['id'], voteNumber })
                        } else {
                            if (hasVottedLast) {
                                setMessageIndex(1)
                                setBottomMessage(true)
                            }
                        }
                    } else {
                        if (hasVottedLast) {
                            setMessageIndex(1)
                            setBottomMessage(true)
                        }
                    }
                }}
            >
                <Icon name="checkmark-circle-outline" size={25} color={voteColor()} />
                <Text style={[GlobalStyles.textAlignCenter, GlobalStyles.manginLeftSm, { color: voteColor() }]}>
                    {voteText}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderComprovanteButton = () => {
        const votosCredores = creatorList?.filter(e => e?.[`Voto${voteNumber || ''}`])

        const receiptTextColor = (): string => {
            if (votosCredores?.length) {
                if (!checkEmail) {
                    return Colors.White
                }
                return Colors.Black
            }
            return Colors.Gray
        }

        const receiptButton = (): object => {
            if (votosCredores?.length) {
                if (checkEmail) {
                    return {
                        borderColor: Colors.Green,
                        borderWidth: 1,
                    }
                }
                return { backgroundColor: Colors.Green }
            }
            return { backgroundColor: Colors.White }
        }

        return (
            <TouchableOpacity
                disabled={!votosCredores?.length}
                style={[styles.grayButton, GlobalStyles.marginTopSm, receiptButton()]}
                onPress={() => {
                    if (votosCredores?.length) {
                        if (checkEmail) {
                            setBottomMessage(true)
                            setMessageIndex(2)
                        } else {
                            setSendEmail(true)
                        }
                    }
                }}
            >
                {checkEmailLoading ?
                    <ActivityIndicator />
                    :
                    <>
                        <Icon name="print" size={24} color={receiptTextColor()} />
                        <Text style={[GlobalStyles.textAlignCenter, GlobalStyles.manginLeftSm, { color: receiptTextColor() }]}>
                            Comprovante votação
                        </Text>
                    </>}
            </TouchableOpacity>
        )
    }

    const renderLastVotes = (item) => {
        const keys = Object.keys(item)?.filter(e => e?.toLowerCase()?.startsWith("voto"))

        return keys.map((index) => {
            const votoNumber = index?.replace(/[a-zA-z]/g, '')
            const Voto = item?.[index]
            const DataVoto = item?.[`DataVoto${votoNumber || ''}`]

            return (
                <View style={[GlobalStyles.column, GlobalStyles.justifySpaceBetween, GlobalStyles.marginTopSm]}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>{votoNumber || 1}º votação</Text>
                    </View>
                    <View style={[GlobalStyles.row, GlobalStyles.justifySpaceBetween, GlobalStyles.marginTopXs]}>
                        <Text>
                            Data de voto: {DataVoto ? moment(DataVoto).add(3, 'hours').format("DD/MM/YYYY HH:mm") : '-'}
                        </Text>
                        {Voto ? (<Text style={[styleVotoColor(Voto)]}>
                            {Voto}
                        </Text>) :
                            (<Icon name="hourglass" size={24} color={Colors.Black} />)
                        }
                    </View>
                </View>
            )
        })
    }

    const isLoading = loading || sendEmailLoadng || creatorLoading || votacaoAtualLoading || checkEmailLoading

    return (
        <View style={{ minHeight: '100%' }}>
            <Modal
                isVisible={endAssembly}
                onBackButtonPress={() => setEndAssembly(false)}
                onBackdropPress={() => setEndAssembly(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalClose}>
                        <TouchableOpacity onPress={() => setEndAssembly(false)}>
                            <Icon name="close" size={25} color={Colors.Black} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.modalTitle, GlobalStyles.marginBotSm]}>
                        Assembleia encerrada
                    </Text>
                    <Text style={styles.modalText}>
                        Obrigado pela sua participação!
                    </Text>
                </View>
                <FlashMessage ref={flashRef} position="top" />
            </Modal>
            <Modal
                isVisible={sendEmail}
                onBackButtonPress={() => {
                    if (!sendEmailLoadng)
                        setSendEmail(false)
                }}
                onBackdropPress={() => {
                    if (!sendEmailLoadng)
                        setSendEmail(false)
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalClose}>
                        <TouchableOpacity onPress={() => {
                            if (!sendEmailLoadng)
                                setSendEmail(false)
                        }}>
                            <Icon name="close" size={25} color={Colors.Black} />
                        </TouchableOpacity>
                    </View>
                    <View style={[GlobalStyles.row, GlobalStyles.justifyCenter]}>
                        <Icon name="mail" size={25} color={Colors.Black} />
                        {sendEmailSuccess ?
                            <Text style={[styles.modalTitle, GlobalStyles.marginBotSm, GlobalStyles.marginLeftMd]}>
                                Comprovante enviado para o email: {email ? email : user?.email}
                            </Text>
                            :
                            <Text style={[styles.modalTitle, GlobalStyles.marginBotSm, GlobalStyles.marginLeftMd]}>
                                Confirme seu e-mail
                            </Text>}
                    </View>
                    {!sendEmailSuccess &&
                        <>
                            {!changeEmail ?
                                <Text style={[styles.modalText, GlobalStyles.marginBotSm]}>
                                    {user?.email}
                                </Text>
                                :
                                <>
                                    <TextInput
                                        autoCapitalize="none"
                                        style={styles.emailContainer}
                                        onChangeText={e => {
                                            setEmail(e)
                                            if (emailTest.test(e)) {
                                                setEmailError(false)
                                            } else {
                                                setEmailError(true)
                                            }
                                        }}
                                    />
                                    {emailError && <Text>Email inválido</Text>}
                                </>
                            }
                            <View style={[GlobalStyles.row, GlobalStyles.justifyCenter, GlobalStyles.marginTopSm]}>
                                {sendEmailLoadng ?
                                    <View style={[GlobalStyles.marginTopSm]}>
                                        <ActivityIndicator />
                                    </View>
                                    :
                                    <>
                                        <TouchableOpacity style={[styles.modalButton, GlobalStyles.marginRightMd]} onPress={() => {
                                            setChangeEmail(!changeEmail)
                                            setEmail(null)
                                            setEmailError(false)
                                        }}>
                                            <Text>Alterar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity disabled={emailError || (changeEmail && !email?.length)} style={styles.modalButton} onPress={() => sendEmailApi()}>
                                            <Text>Enviar</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>
                        </>}
                </View>
                <FlashMessage ref={flashRef} position="top" />
            </Modal>
            {bottomMessage &&
                <View style={[styles.messageBottom]}>
                    <Text style={styles.messageBottomText}>
                        {messageFromIndex()}
                    </Text>
                </View>}
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading}
                onRefresh={() => {
                    loadAssembly()
                    loadCreator()
                    loadVotacaoAtual();
                }} />}>
                {isLoading ?
                    <ActivityIndicator style={GlobalStyles.marginTopSm} />
                    :
                    <>
                        <View style={styles.containerTop}>
                            {/* Title */}
                            <Text style={styles.title}>{assembly?.title}</Text>
                            <View style={[GlobalStyles.row, GlobalStyles.marginBotSm, GlobalStyles.marginTopSm]}>
                                <Text>Status: </Text>
                                <Badge color={Colors.Purple}>
                                    {getProcessStatus()}
                                </Badge>
                            </View>

                            {/* Url Container */}
                            <View style={[GlobalStyles.row, GlobalStyles.alignCenter]}>
                                <View>
                                    <View style={styles.camIcon}>
                                        <Icon name="videocam" size={25} color={Colors.White} />
                                    </View>
                                </View>
                                <View style={[GlobalStyles.manginLeftSm]}>
                                    <Text>URL Transmissão:</Text>
                                    <Text style={styles.linkUrl} onPress={() => handlePress()}>{assembly?.urlStreaming ? 'Clique aqui para acessar a transmissão' : 'Aguardando link de transmissão'}</Text>
                                </View>
                            </View>

                            {/* Buttons */}
                            <View style={GlobalStyles.marginTopSm}>
                                <View style={GlobalStyles.row}>
                                    <TouchableOpacity
                                        disabled={Number(assembly?.status) === 2}
                                        style={[styles.greenButton, { backgroundColor: representationButtonColor() }]}
                                        onPress={() => {
                                            setBottomMessage(true)
                                            setMessageIndex(0)
                                        }}
                                    >
                                        <FontAwesome5 name="cog" size={24} color={representationTextColor()} />
                                        <Text style={[GlobalStyles.textAlignCenter, GlobalStyles.manginLeftSm, { color: representationTextColor() }]}>
                                            Representação{'\n'}Efetuada
                                        </Text>
                                    </TouchableOpacity>
                                    {renderVotacoesButton()}
                                </View>
                                {renderComprovanteButton()}
                            </View>
                        </View>

                        {/* List */}
                        <View style={[GlobalStyles.marginRightSm, GlobalStyles.manginLeftSm, GlobalStyles.marginTopSm]}>
                            <View style={styles.agentContainer}>
                                <Icon name="checkbox" size={24} color={Colors.Green} />
                                <Text style={[GlobalStyles.marginLeftXsm, styles.agentText]}>
                                    Representante Presente: {user?.fullName}
                                </Text>
                            </View>
                            <Text style={styles.agentNumber}>Total de credores representados: Nº {creatorList?.length}</Text>
                        </View>
                        <FlatList
                            style={{ marginBottom: 100 }}
                            ListFooterComponent={creatorLoading ?
                                <ActivityIndicator style={GlobalStyles.marginTopSm} />
                                : null}
                            data={creatorList || []}                            
                            renderItem={({ item }) =>
                                <View style={styles.agentItem}>
                                    <Text style={styles.agentItemTitle}>
                                        {item?.Credor}
                                    </Text>
                                    <View style={[GlobalStyles.row, GlobalStyles.justifySpaceBetween, GlobalStyles.marginBotSm, GlobalStyles.marginTopSm]}>
                                        <Text>
                                            Classe: {item?.Classe}
                                        </Text>
                                        <Text>
                                            Valor: {monetize(item?.Valor)}
                                        </Text>
                                    </View>
                                    {renderLastVotes(item)}
                                    
                                </View>
                            }
                            
                            keyExtractor ={(item, index) =>  (15 * Math.random()).toString()  }
                             
                        />
                    </>
                }
            </ScrollView>
        </View>
    )

}

export default ProgressRepresention
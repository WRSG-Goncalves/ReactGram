import React, { FunctionComponent, useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { UserContext } from '../../contexts/UserContext'
import GlobalStyles from '../../styles/GlobalStyles'
import { Colors } from "../../constants/Colors"
import { showAlertMessage, sortAlphabetically } from '../../utils/index'
import Modal from 'react-native-modal'
import api from '../../services/api'
import { useQuery } from 'react-apollo'
import { useRoute } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons'
import { GET_ASSEMBLY } from './graphql'
import { GetPAssemblyResponse, GetAssemblyVariables } from './interfaces'
import { Checkbox } from 'react-native-paper'
import styles from './styles'
import { monetize } from '../../utils'
import { useNavigation } from '@react-navigation/native'

const Representation: FunctionComponent<{}> = ({}) => {
    const { params } = useRoute()
    const { user } = useContext(UserContext)
    const navigation = useNavigation()

    const { data } = useQuery<GetPAssemblyResponse, GetAssemblyVariables>(GET_ASSEMBLY, {
        variables: {
            id: params['id']
        }
    })


    const [checkedItems, setCheckedItems] = useState([])
    const [checkAll, setCheckAll] = useState('unchecked')
    const [representationData, setRepresentationData] = useState([])
    const [loadingList, setLoadingList] = useState(false)
    const [loadingStart, setLoadingStart] = useState(false)
    // const [creatorLoading, setCreatorLoading] = useState(false)
    const [checkingLoading, setCheckingLoading] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [success, setSuccess] = useState(false)

    const AGCRepresentation = async () => {
        setLoadingList(true)
        try {
            const { data: agcData, status } = await api.post('/agc-iniciar-representacao', {
                assemblyId: data?.assembly?.id,
                userId: user?.id,
            })

            if(status === 200) {
                if (!agcData?.recordset?.[0]?.RepresentacaoEfetuada && agcData?.recordset?.length > 0) {
                    setRepresentationData(sortAlphabetically(agcData.recordset, 'CredorNome'))
                } else {
                    navigation.navigate('ProgressRepresentation', { id: data?.assembly?.id})
                }
            }
            else {
                showAlertMessage('Erro ao carregar listagem!', 'danger')
            }
        } catch(err) {
            showAlertMessage('Erro ao carregar listagem!', 'danger')
        }
        setLoadingList(false);
    }

    const startRepresentation = async () => {
        setLoadingStart(true)
        
        try {
            const { status } = await api.post('/iniciar-representacao', {
                ids: checkedItems.toString(),
                userId: user?.id,
            })
            if(status === 200 || status === 201) {
                setSuccess(true)
                setShowSuccessModal(true)

            } else {
                setShowErrorModal(true)
            }
        } catch(err) {
            setShowErrorModal(true)
        }        
        setLoadingStart(false)
    }

    // const loadCreator = async () => {
    //     setCreatorLoading(true)
    //         await api.post('/representacao-credor-usuario', {
    //             "processId": params['processId'],
    //             "userId": user?.id
    //         })
    //         .then(function (response) {
    //             setCreatorList(response?.data?.recordsets?.[0])
    //             setCreatorLoading(false)
    //         })
    //         .catch(function (error) {
    //             console.log('error',error)
    //             showAlertMessage('Erro ao carregar listagem!', 'danger')
    //             setCreatorLoading(false)
    //         })
    // }

    useEffect(() => {
        AGCRepresentation()
    
    }, []);

    useEffect(()=> {
        if(representationData){
            setCheckingLoading(true);
            
            const ids = representationData.map(({Id}) => Id)

            if(ids){
                setCheckedItems(ids)
                setCheckAll('checked');
            }

            setCheckingLoading(false);
        }
    }, [representationData])

    const isChecked = (id) => {
        const index = checkedItems.findIndex(item=> item === id)
        if(index !== -1){
            return 'checked';
        } 
        
        return 'unchecked';
    }

    const handleCheck = (id) => {
        const index = checkedItems.findIndex(item=> item === id)
        if(index !== -1){
            setCheckedItems(checkedItems.filter(item=> item !== id))
            if(checkAll === 'checked'){
                setCheckAll('unchecked')
            }
        } 
        else {
            setCheckedItems([...checkedItems, id])  
        }
    }

    const checkAllItems = () => {
        let checked = [];
        
        if(checkAll === 'checked'){
            setCheckedItems([]);
            setCheckAll('unchecked')
        }else {
            checked = representationData.map(({Id}) => Id);
            setCheckedItems(checked)
            setCheckAll('checked')
        }

    }
    const renderModalContent = () => {
            return <View style={{flex: 1}}>
            <View 
                style={[GlobalStyles.row, GlobalStyles.alignCenter]}>
                <AntDesign name="check" size={36} color="green" />
                <Text style={styles.modalSuccessText}>{' '}Sucesso!</Text>
            </View>
            <Text style={styles.modalText}>
                Dados registrados! Aguarde o inicio das votações
            </Text>
            <CustomButton style={styles.modalButton} onPress={()=> {setShowSuccessModal(false); navigation.navigate('ProgressRepresentation', { id: data?.assembly?.id})}}>
                <Text style={styles.modalButtonText}>
                    OK
                </Text>
            </CustomButton>
        </View>
    }

    const renderErrorModalContent = () => {
        return (
        <View style={{flex: 1}}>
            <View style={[GlobalStyles.row, GlobalStyles.alignCenter]}>
                <AntDesign name="close" size={36} color="red" />
                <Text style={styles.modalSuccessText}>{' '}Erro!</Text>
            </View>
            <Text style={styles.modalText}>
                Erro ao iniciar representação!
            </Text>
            <CustomButton style={styles.modalButton} onPress={()=> {setShowErrorModal(false)}}>
                <Text style={styles.modalButtonText}>
                    OK
                </Text>
            </CustomButton>
        </View>
        )    
    }

    return (
        <View style={styles.container}>
            <View style={styles.representationContainer}>
                <Text style={styles.title}>
                    Iniciar Representação
                </Text>
                <Text style={[GlobalStyles.textAlignCenter, styles.representationDesc]}>
                    Selecione os credores que você deseja iniciar a representação.
                </Text>
                <TouchableOpacity style={styles.startRepresentationButton} onPress={()=> startRepresentation()}>
                    {loadingStart 
                    ? <ActivityIndicator color={Colors.White} size={'small'} style={{marginVertical: 10}}/> 
                    : 
                    <Text style={styles.buttonText}>
                        Iniciar representação dos selecionados
                    </Text>
                    }
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => checkAllItems()}>
                <View style={styles.selectAllContainer}>
                    <Checkbox.Android 
                        onPress={()=> checkAllItems()} 
                        status={checkAll} 
                        color={Colors.Secondary}
                    />
                    <Text style={{ marginLeft: 10 }}>Selecionar todos</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.flatListContainer}>
                {(loadingList || checkingLoading ) ? <ActivityIndicator style={{marginTop: 20}}/> : (
                    <FlatList 
                        refreshControl={<RefreshControl refreshing={loadingList} onRefresh={() => {
                            AGCRepresentation();
                        }} />}
                        data={representationData}
                        keyExtractor={item => item?.Id?.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleCheck(item?.Id)}>
                                <View style={styles.flatItemContainer}>
                                    <View style={GlobalStyles.justifyCenter}>
                                        <Checkbox.Android  
                                            status={isChecked(item?.Id)} 
                                            onPress={() => handleCheck(item?.Id)}
                                            color={Colors.Secondary}
                                        />
                                    </View>
                                    <View style={{flex: 1, marginLeft: 10}}>
                                        <Text style={styles.creditorText}>{item.CredorNome}</Text>
                                        <View style={styles.classContainer}> 
                                            <View style={{flex: 1}}>
                                                <Text>
                                                    <Text style={GlobalStyles.fontWeightBold}>Classe:</Text> 
                                                    {' '} {item?.CredorClasse}
                                                </Text>
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text>
                                                    <Text style={GlobalStyles.fontWeightBold}>Valor:</Text> 
                                                    {' '} {monetize(item?.Valor)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
            <Modal
                isVisible={showSuccessModal}
                onBackButtonPress={() => setShowSuccessModal(false)}
                onBackdropPress={() => setShowSuccessModal(false)}
            >
                <View style={styles.modalContainer}>
                    {renderModalContent()}
                </View>
            </Modal>

            <Modal
                isVisible={showErrorModal}
                onBackButtonPress={() => setShowErrorModal(false)}
                onBackdropPress={() => setShowErrorModal(false)}
            >
                <View style={styles.modalContainer}>
                    {renderErrorModalContent()}
                </View>
            </Modal>
        </View>
    )
}

export default Representation

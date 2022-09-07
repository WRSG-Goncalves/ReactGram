import React, { FunctionComponent, useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import GlobalStyles from '../../styles/GlobalStyles'
import { Colors } from "../../constants/Colors"
import { UserContext } from '../../contexts/UserContext'
import CustomButton from '../../components/CustomButton'
import { useRoute } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons';
import api from '../../services/api'
import { Checkbox } from 'react-native-paper'
import Modal from 'react-native-modal'
import moment from 'moment'
import styles from './styles'
import { monetize } from '../../utils'
import { GutterSizes } from '../../constants/GutterSizes'
import { useNavigation } from '@react-navigation/native'

const Voting: FunctionComponent<{}> = ({}) => {

    const [votes, setVotes] = useState([])
    const [checkAllApprove, setCheckAllApprove] = useState('')
    const [checkAllDisapprove, setCheckAllDisapprove] = useState('')
    const [checkAllAbstain, setCheckAllAbstain] = useState('')
    const [loadingList, setLoadingList] = useState(false)
    const [loadingActualVoting, setLoadingActualVoting] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showIncompleteModal, setShowIncompleteModal] = useState(false)
    const [votingData, setVotingData] = useState([])
    const [actualVoting, setActualVoting] = useState('')
    const [meeEpp,setMeeEpp] = useState(0)
    const [quiro, setQuiro] = useState(0)
    const [workers, setWorkers] = useState(0)
    const [guarantee, setGuarantee] = useState(0)

    const { params } = useRoute()
    const { user } = useContext(UserContext)
    const { goBack } = useNavigation()
    const assemblyId = params['id'];
    const voteNumber = params['voteNumber'] || '';
    
    const VOTE_TYPE = {ABSTEM: 0, APROVA: 1, REPROVA: 2}

    const AGCVoting = async () => {
        setLoadingList(true)
        try {
            const { data:agcData, status } = await api.post('/agc-iniciar-votacao', {
                assemblyId: assemblyId,
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

    const AGCActualVoting = async () => {
        setLoadingActualVoting(true)
        try {
            const { data: votingData, status } = await api.post('/agc-votacao-atual', {
                assemblyId: assemblyId
            })
            if(status === 200){
                setActualVoting(votingData?.recordset?.[0])
            }
        } catch(err) {
            console.log('error', err)
        }
        setLoadingActualVoting(false);
    }

    useEffect(()=> {
        AGCVoting();
        AGCActualVoting();
    },[])

    useEffect(()=> {
        if(votingData){
            let me = 0;
            let quiro = 0;
            let garantia = 0;
            let trabalhista = 0;
            votingData.forEach(item => {
                switch (item.CredorClasse) {
                    case 'Quirografarios': quiro++;
                    break;
                    case 'ME e EPP': me++;
                    break;
                    case 'Trabalhista': trabalhista++;
                    break;
                    case 'Garantia Real': garantia++;
                    break;
                }
            })
            setWorkers(trabalhista)
            setMeeEpp(me)
            setGuarantee(garantia)
            setQuiro(quiro)
        }
        
    },[votingData])

    const handleVote = (AssembleiaCredorId,voteId) => {
        const localVotes = [...votes];
        const index = localVotes.findIndex(vote => vote.id === AssembleiaCredorId);
        if(index !== -1){
            localVotes[index] = { id: AssembleiaCredorId, vote: voteId}
        } else {
            localVotes.push({id: AssembleiaCredorId, vote: voteId})
        }

        setVotes(localVotes)

        switch (voteId) {
            case VOTE_TYPE['APROVA']: 
                setCheckAllAbstain('unchecked')
                setCheckAllDisapprove('unchecked')
            break;

            case VOTE_TYPE['REPROVA']: 
                setCheckAllAbstain('unchecked')
                setCheckAllApprove('unchecked')
            break;

            case VOTE_TYPE['ABSTEM']:
                setCheckAllApprove('unchecked')
                setCheckAllDisapprove('unchecked')
            break;
        }
        
    }

    const isVoted = (AssembleiaCredorId,voteId) => {
        const find = votes.find(item => item.id === AssembleiaCredorId && item.vote === voteId)
        
        if(find) {
            return true;
        }
        
        return false;
    }

    const checkAllItems = (voteId) => {
        const localVotes = votingData.map(item=> ({id: item.AssembleiaCredorId, vote: voteId}));
        setVotes(localVotes);

        setCheckAllApprove('unchecked')
        setCheckAllDisapprove('unchecked')
        setCheckAllAbstain('unchecked')

        switch (voteId) {
            case VOTE_TYPE['APROVA']: 
                if(checkAllApprove === 'checked'){
                    setVotes([])
                    setCheckAllApprove('unchecked')
                } else {
                    setCheckAllApprove('checked')
                }
            break;

            case VOTE_TYPE['REPROVA']: 
                if(checkAllDisapprove === 'checked'){
                    setVotes([])
                    setCheckAllDisapprove('unchecked')
                } else {
                    setCheckAllDisapprove('checked')
                }
            break;

            case VOTE_TYPE['ABSTEM']: 
                if(checkAllAbstain === 'checked'){
                    setVotes([])
                    setCheckAllAbstain('unchecked')
                } else {
                    setCheckAllAbstain('checked')
                }
            break;
        }
    }

    const submitVotes = async () => {

        if(votes.length < votingData.length){
            setShowIncompleteModal(true);
            return
        }
        setLoadingSubmit(true);

        const date = moment().format('YYYY-MM-DD HH:mm:ss') 
        let query = '';
        
        query = votes.reduce((ac, cv) => `${ac} Update AssembleiaCredor Set AspNetUserVotoId = 
        '${user?.id}', Voto${voteNumber} = ${cv?.vote}, DataVoto${voteNumber} = '${date}' Where Id = ${cv?.id}`, []).trim();

        try {
            const { status } = await api.post('/iniciar-votacao', {
                query
            })

            if(status === 200){
                setShowSuccessModal(true);
            }

        } catch(err) {
            console.log('error', err?.response?.data)
        }
        setLoadingSubmit(false);
    }

    return (
        <View style={styles.container}>
            {(loadingActualVoting || loadingList)
            ? <ActivityIndicator size={'small'} style={{marginTop: 20}}/> 
            : (
            <>
                <TouchableOpacity disabled={loadingSubmit} style={styles.voteButton} onPress={()=> submitVotes()}>
                {loadingSubmit 
                ? <ActivityIndicator size={'small'} color={Colors.White}/>
                : (
                    <> 
                        <AntDesign name="checksquareo" size={24} color="white" />
                        <Text style={styles.buttonText}>
                            {' '}Confirmar
                        </Text>
                    </>
                    )}
                </TouchableOpacity>
            
                <Text style={styles.title}>
                    {actualVoting?.VotacaoAtual}ª VOTAÇÃO:
                </Text>
                <Text style={styles.subtitle}>
                    {actualVoting?.TextoVotacao}
                </Text>
                <View 
                style={[GlobalStyles.row, GlobalStyles.justifySpaceBetween,
                        {width: '100%' ,paddingHorizontal: GutterSizes.sm, flexWrap: 'wrap'}]}>
                    <Text style={styles.resultTypes}>
                        ME e EPP = {meeEpp}
                    </Text>
                    <Text style={styles.resultTypes}>
                        Quirografários = {quiro}
                    </Text>
                    <Text style={styles.resultTypes}>
                        Garantia Real = {guarantee}
                    </Text>
                    <Text style={styles.resultTypes}>
                        Trabalhista = {workers}
                    </Text>
                </View>
                <View style={styles.selectAllContainer}>
                    <TouchableOpacity style={[GlobalStyles.alignCenter]} onPress={() => checkAllItems(VOTE_TYPE['APROVA'])}>
                        <Checkbox.Android 
                            onPress={()=> checkAllItems(VOTE_TYPE['APROVA'])}
                            status={checkAllApprove} 
                            color={Colors.Green}
                            // uncheckedColor={Colors.Green} 
                        />
                        <Text style={[styles.textTitle,{color: Colors.Green}]}>Aprova Todos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[GlobalStyles.alignCenter]} onPress={() => checkAllItems(VOTE_TYPE['REPROVA'])}>
                        <Checkbox.Android 
                            onPress={()=> checkAllItems(VOTE_TYPE['REPROVA'])} 
                            status={checkAllDisapprove} 
                            color={Colors.Red}
                            // uncheckedColor={Colors.Red}
                        />
                        <Text style={[styles.textTitle,{color: Colors.Red}]}>Reprova Todos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[GlobalStyles.alignCenter]} onPress={() => checkAllItems(VOTE_TYPE['ABSTEM'])}>
                        <Checkbox.Android 
                            onPress={()=> checkAllItems(VOTE_TYPE['ABSTEM'])} 
                            status={checkAllAbstain} 
                            color={Colors.Yellow}
                            // uncheckedColor={Colors.Yellow}
                        />
                        <Text style={[styles.textTitle,{color: Colors.Yellow}]}>Abstém Todos</Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    data={votingData}
                    style={{backgroundColor: Colors.White, paddingTop: GutterSizes.xs}}
                    keyExtractor={item => item?.CredorId?.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.flatItemContainer}>
                            <Text> 
                                <Text style={styles.creditorText}>Nome do credor:</Text>
                                {' '}{item?.CredorNome}
                            </Text>
                            
                            <Text style={GlobalStyles.marginTopXs}>
                                <Text style={GlobalStyles.fontWeightBold}>Classe:</Text> 
                                {' '}{item?.CredorClasse}
                            </Text>

                            <Text style={GlobalStyles.marginTopXs}>
                                <Text style={GlobalStyles.fontWeightBold}>Valor do crédito:</Text> 
                                {' '}{monetize(item?.Valor)}
                            </Text>
                            <View style={[GlobalStyles.row, GlobalStyles.justifySpaceBetween, GlobalStyles.marginTopSm]}>
                                <TouchableOpacity 
                                    style={votes && isVoted(item?.AssembleiaCredorId, VOTE_TYPE['APROVA']) ? styles.approveSelected : styles.approve}
                                    onPress={() => handleVote(item?.AssembleiaCredorId,VOTE_TYPE['APROVA'])}
                                >
                                    <Text style={votes && isVoted(item?.AssembleiaCredorId, VOTE_TYPE['APROVA']) ? styles.selectedVoteText : styles.approveText}>Aprova</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={isVoted(item?.AssembleiaCredorId,VOTE_TYPE['REPROVA']) ? styles.disapproveSelected : styles.disapprove}
                                    onPress={() => handleVote(item?.AssembleiaCredorId,VOTE_TYPE['REPROVA'])}
                                >
                                    <Text style={isVoted(item?.AssembleiaCredorId,VOTE_TYPE['REPROVA']) ? styles.selectedVoteText : styles.disapproveText}>Reprova</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={isVoted(item?.AssembleiaCredorId,VOTE_TYPE['ABSTEM']) ? styles.abstainSelected : styles.abstain}
                                    onPress={() => handleVote(item?.AssembleiaCredorId,VOTE_TYPE['ABSTEM'])}
                                >
                                    <Text style={isVoted(item?.AssembleiaCredorId,VOTE_TYPE['ABSTEM']) ? styles.selectedVoteText : styles.abstainText}>Abstém</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </>
            )}
            <Modal
                isVisible={showSuccessModal}
                onBackButtonPress={() => setShowSuccessModal(false)}
                onBackdropPress={() => setShowSuccessModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={{flex: 1}}>
                        <View 
                            style={[GlobalStyles.row, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                            <AntDesign name="check" size={36} color="green" />
                            <Text style={styles.modalSuccessText}>Sucesso!</Text>
                        </View>
                        <Text style={styles.modalText}>
                            Sua votação foi realizada com sucesso!
                        </Text>
                        <CustomButton style={styles.modalButton} onPress={()=> {setShowSuccessModal(false); goBack()}}>
                            <Text style={styles.modalButtonText}>
                                OK
                            </Text>
                        </CustomButton>
                    </View>
                    
                </View>
            </Modal>

            <Modal
                isVisible={showIncompleteModal}
                onBackButtonPress={() => setShowIncompleteModal(false)}
                onBackdropPress={() => setShowIncompleteModal(false)}
            >
                <View style={styles.modalIncompleteContainer}>
                    <View style={{flex: 1}}>
                        <View 
                            style={[GlobalStyles.row, GlobalStyles.alignCenter]}>
                            <AntDesign name="exclamationcircleo" size={26} color="red" />
                            <Text style={styles.modalIncompleteText}>{'  '}Votação incompleta</Text>
                        </View>
                        <Text style={styles.modalText}>
                           Você deixou 1 ou mais votações incompletas.
                        </Text>
                        <CustomButton style={styles.modalButton} onPress={()=> {setShowIncompleteModal(false);}}>
                            <Text style={styles.modalButtonText}>
                                Voltar
                            </Text>
                        </CustomButton>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Voting
import React, { FunctionComponent, useContext } from 'react'
import { View, Text } from 'react-native'
import { ListItemProps } from './interfaces'
import styles from './styles'
import GlobalStyles from '../../../styles/GlobalStyles'
import Icon from '../../../components/Icon'
import { Colors } from '../../../constants/Colors'
import Badge from '../../../components/Badge/Index'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../../../contexts/UserContext'

const orderStatus = {
    "Aguardando": 0,
    "Aguardando Quorum": 1,
    "Iniciada": 2,
    "Finalizar Representação": 5,
    "Finalizada": 3,
    "Cancelada": 4,
}

const ListItem: FunctionComponent<ListItemProps> = ({ process }) => {
    const { user } = useContext(UserContext)

    const { navigate } = useNavigation()

    const getProcessStatus = (): string => {
        // process?.assemblies?.sort((a, b): number => {
        //     return moment(b.date).unix() - moment(a.date).unix()
        // })

        switch (getLastAssembly().status) {
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

    const getButtonDisabled = (): boolean => {
        let disabled = false
        
        const disabledStatus = [0, 1, 2, 3, 5];

        if (!disabledStatus.includes(process?.Status)) {
            disabled = true;
        }

        // loop1:
        // for (const assembly of process?.assemblies) {
        //     console.log(Number(assembly?.status))
        //     if (Number(assembly?.status) === 5) {
        //         for (const creditor of assembly?.creditors) {
        //             for (const representation of creditor?.representations) {
        //                 if (representation?.authorized && representation?.userId !== user?.id) {
        //                     disabled = true
        //                     break loop1
        //                 }
        //             }
        //         }
        //     }
        // }

        // if (!disabled) {
        //     loop1:
        //     for (const assembly of process?.assemblies) {
        //         if (Number(assembly?.status === 5) || Number(assembly?.status === 2)) {
        //             for (const creditor of assembly?.creditors) {
        //                 for (const representation of creditor?.representations) {
        //                     if (representation?.authorized && representation?.userId === user?.id) {
        //                         disabled = true

        //                         break loop1
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        return disabled
    }

    const getLastAssembly = () => {
        const assembleias = process.Assembleias.split(',').sort((a,b) => {
            const statusA = Object.values(orderStatus).findIndex(e => e === Number(a.split('-')[1].trim()))
            const statusB = Object.values(orderStatus).findIndex(e => e === Number(b.split('-')[1].trim()))

            if (+statusA === +statusB) {
                const idA = +a.split('-')[0].trim();
                const idB = +b.split('-')[0].trim();

                return idB - idA;
            }

            return statusA - statusB
        })
        const [id, status] = assembleias?.[0]?.split('-')

        return {id: +id.trim(), status: +status.trim()}
    }

    const disabled = getButtonDisabled()

    console.log(getLastAssembly())

    return (
        <View style={{ padding: 15 }}>
            <View style={{ backgroundColor: 'white', padding: 15 }}>
                <View style={[GlobalStyles.column, GlobalStyles.alignCenter, styles.cardColor, GlobalStyles.fullWidth]}>
                    <View style={[GlobalStyles.marginLeftXsm]}>
                        <Text style={[styles.titleText, GlobalStyles.marginBotSm]}>
                            {process?.Titulo}
                        </Text>
                    </View>
                </View>
                
                <View style={[GlobalStyles.row, GlobalStyles.alignCenter, GlobalStyles.justifySpaceBetween, styles.header, styles.cardColor]}>
                    <View style={[GlobalStyles.row, GlobalStyles.alignCenter]}>
                        <Text style={[styles.subtext]}>
                            Status:
                        </Text>
                        <View style={[GlobalStyles.marginLeftXsm]}>
                            <Badge color={Colors.Blue}>
                                {getProcessStatus()}
                            </Badge>
                        </View>
                    </View>
                    <Text style={[styles.subtext]}>
                        {moment(process?.Data).format('DD/MM/YYYY - HH:mm')}
                    </Text>
                </View>
                <View style={[styles.cardColor]}>
                    <Text style={[styles.maintext]}>
                        {process?.Numero}
                    </Text>
                </View>
                <View style={[GlobalStyles.row, GlobalStyles.justifySpaceBetween, styles.cardColor, GlobalStyles.fullWidth]}>
                    <Text style={[styles.subtext]}>
                        {process?.Recuperandas} Recuperandas
                    </Text>
                    <View>
                        <Text style={[styles.subtext]}>
                            credor/representante
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.paddingButton]} disabled={disabled} activeOpacity={disabled ? 1 : 0.2} onPress={() => navigate(
                       Number(process?.Status === 3) ? 'ProgressRepresentation' : 'Assembly', { id: getLastAssembly().id, processId: process?.Id})
                    }>
                    <View style={[styles.agcStyle, GlobalStyles.row, styles.paddingAgc, GlobalStyles.justifyCenter]}>
                        {
                            disabled && (
                                <View style={GlobalStyles.marginRightXs}>
                                    <Icon name="lock" size={20} color={Colors.DarkGray} />
                                </View>
                            )
                        }
                        <Icon name="exit" size={20} color={disabled ? Colors.DarkGray : Colors.Green}></Icon>
                        <View style={[styles.header]}>
                            <Text style={[styles.agctext, disabled ? { color: Colors.DarkGray } : {}]}>
                                ACESSAR AGC VIRTUAL
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ListItem
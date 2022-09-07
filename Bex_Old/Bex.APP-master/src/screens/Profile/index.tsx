import React, { FunctionComponent, useContext } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { UserContext } from '../../contexts/UserContext'
import styles from './styles'
import GlobalStyles from '../../styles/GlobalStyles'
import { Colors } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/core'
import {MaskService} from 'react-native-masked-text';

const Profile: FunctionComponent = () => {
    const { logout, user } = useContext(UserContext)
    const { navigate } = useNavigation()

    return (
        <View style={[styles.container]}>
            <View style={[GlobalStyles.row, GlobalStyles.alignCenter]}>
                <Image source={require('../../../assets/profile-sample.png')} style={styles.profileimage} />
                <Text style={[styles.maintext, GlobalStyles.manginLeftSm]}>
                    {user?.fullName ? user?.fullName : '-'}
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.subtext}>
                    Nome de Usuário: {user?.userName ? user?.userName : '-'}
                </Text>
                <Text style={styles.subtext}>
                    Email: {user?.email ? user?.email : '-'}
                </Text>
                <Text style={styles.subtext}>
                    OAB: {user?.oab ? user?.oab : '-'}
                </Text>
                <Text style={styles.subtext}>
                    CPF: {user?.cpf ? user?.cpf : '-'}
                </Text>
                <Text style={styles.subtext}>
                    CNPJ: {user?.cnpj ? user?.cnpj : '-'}
                </Text>
                <Text style={styles.subtext}>
                    Celular: {user?.phoneNumber ? MaskService.toMask('cel-phone', user?.phoneNumber?.toString(), {
                        withDDD: true,
                        dddMask: '(99) ',
                        maskType: 'BRL',
                    }) : '-'}
                </Text>
            </View>
            <View style={[styles.container]}>
                <Button
                    title='Mudar Senha'
                    onPress={() => { navigate('ChangePassword') }}
                    color={Colors.Secondary}
                />
            </View>
            <View style={[styles.container]}>
                <Button
                    title='Sair'
                    onPress={logout}
                    color={Colors.Secondary}
                />
            </View>
        </View>
    )
}

export default Profile
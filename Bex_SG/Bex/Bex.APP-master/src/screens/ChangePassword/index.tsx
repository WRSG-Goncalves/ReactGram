import React, { FunctionComponent, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Colors } from '../../constants/Colors'
import { UserContext } from '../../contexts/UserContext'
import Form, { useForm } from "rc-field-form"
import FormView from "../../components/Form"
import Field from '../../components/Field'
import Input from '../../components/Input'
import style from '../Profile/styles'
import { User } from '../../interfaces/User'
import { useMutation } from 'react-apollo'
import { CHANGE_PASSWORD } from './graphql'
import { ChangePasswordResponse, ChangePasswordVariables } from './interfaces'
import { AlertProvider } from '../../providers/AlertProvider'
import styles from "./styles";
import GlobalStyles from "../../styles/GlobalStyles";
import { useNavigation } from '@react-navigation/core'

const ChangePassword: FunctionComponent = () => {
    const { user } = useContext(UserContext)
    const { navigate } = useNavigation()

    const [form] = useForm()

    const [editPassword, { loading }] = useMutation<ChangePasswordResponse, ChangePasswordVariables>(CHANGE_PASSWORD)

    const onSubmit = async (fields: { password: string }) => {
        await editPassword({
            variables: {
                password: fields.password
            }
        })
        AlertProvider.success('Sucesso', 'Senha alterada com sucesso')
        navigate('Profile')
    }

    return (
        <View style={style.container}>
            <Form component={FormView} form={form} onFinish={onSubmit}>
                <Text>
                    Digite sua nova senha
                </Text>
                <Field
                    name="password"
                    label="Nova Senha"
                    rules={[{ required: true }]}
                >
                    <Input
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                </Field>
                <Text>
                    Confirme sua nova senha
                </Text>
                <Field
                    name="confirmPassword"
                    label="Confirmar Senha"
                    dependencies={['password']}
                    shouldUpdate
                    rules={[
                        {
                            required: true,
                            message: "Por favor, confirme a sua senha"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('As senhas não são iguais')
                            }
                        })
                    ]}
                >
                    <Input
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                </Field>
            </Form>
            <TouchableOpacity
              onPress={() => form.submit()}
              style={[
                GlobalStyles.row,
                GlobalStyles.alignCenter,
                GlobalStyles.justifyCenter,
                styles.button,
              ]}
              disabled={loading}
            >
                {loading ? 
                    <ActivityIndicator />
                :  
                    <Text style={styles.buttonText}>Mudar Senha</Text>
                }
            </TouchableOpacity>
        </View>
    )
}
export default ChangePassword
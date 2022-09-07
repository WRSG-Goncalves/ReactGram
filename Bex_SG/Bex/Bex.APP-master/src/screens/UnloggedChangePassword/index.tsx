import React, { FunctionComponent, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Form, { useForm } from "rc-field-form"
import FormView from "../../components/Form"
import Field from '../../components/Field'
import api from '../../services/api'
import Input from '../../components/Input'
import style from '../Profile/styles'
import { AlertProvider } from '../../providers/AlertProvider'
import styles from "./styles";
import GlobalStyles from "../../styles/GlobalStyles";
import { navigate } from '../../services/RootNavigation';

const UnloggedChangePassword: FunctionComponent = ({ route }) => {
    const [loading, setLoading] = useState(false);

    const [form] = useForm()

    const onSubmit = async (fields: { password: string }) => {
        setLoading(true);
        try {
            const { params } = route;
            if (params?.code && params?.uid) {
                const { uid, code } = params;
                
                const { status, data } = await api.post('/alterar-senha', {
                    userId: uid,
                    codigo: code,
                    senha: fields.password,
                })
                
                if (status === 200) {
                    AlertProvider.success('Sucesso', 'Senha alterada com sucesso')
                    navigate('Login')
                } else {
                    AlertProvider.error('Erro', 'Erro ao atualizar senha, tente novamente mais tarde!')
                }
            } else {
                AlertProvider.error('Erro', 'Erro ao obter token, reinicie o processo e tente novamente!')
            }
        } catch (err) {
            if(err?.response?.status === 404) {
                AlertProvider.error('Erro', 'Token expirado, reinicie o processo e tente novamente!')
                setLoading(false);
                return;
            }
            AlertProvider.error('Erro', 'Erro ao atualizar senha, tente novamente mais tarde!')
        }
        setLoading(false);
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
                        onSubmitEditing={() => form.submit()}
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
export default UnloggedChangePassword
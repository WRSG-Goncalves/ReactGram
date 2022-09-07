import React, { FunctionComponent, useContext, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator } from 'react-native';
import Form, { useForm } from "rc-field-form";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native'
import GlobalStyles from "../../styles/GlobalStyles";
import { UserContext } from "../../contexts/UserContext";
import styles from "./styles";
import Input from "../../components/Input";
import Field from "../../components/Field";
import FormView from "../../components/Form";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";
import api from '../../services/api';
import { AlertProvider } from '../../providers/AlertProvider'

const ForgotPassword: FunctionComponent<{
  navigation: StackNavigationProp<{}>;
}> = ({ navigation }) => {
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const { login: authorize } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = useForm();

  const { navigate } = useNavigation()

  const resetPassword = async ({email: userName}) => {
    setLoading(true);
    try{
      const { status, data } = await api.post('/request-reset-senha', {userName})
      if (status === 200) {
        AlertProvider.success('Sucesso', 'Email enviado com sucesso!')
        navigate('Login')
      } else {
        AlertProvider.error('Erro', 'Erro ao enviar solicitação de recuperação de senha.')
      }
    } catch(e) {
      AlertProvider.error('Erro', 'Erro ao enviar solicitação de recuperação de senha.')
    }
    setLoading(false);
  };

  return (
    <View  style={{flex:1, backgroundColor: Colors.LightGray}}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View
            style={[
              GlobalStyles.row,
              GlobalStyles.alignCenter,
              GlobalStyles.justifyCenter,
              styles.header,
            ]}
          >
            <Text style={styles.headerTitle}>Recuperar Senha</Text>
          </View>
          <View
            style={[
              GlobalStyles.flex,
              GlobalStyles.alignCenter,
              GlobalStyles.justifyCenter,
              {
                paddingHorizontal: GutterSizes.sm,
                backgroundColor: Colors.LightGray,
              },
              
            ]}
          >
            <TouchableOpacity onPress={()=> navigation.goBack()} style={{alignSelf: 'flex-start', marginTop: 10}}>
              <AntDesign name="arrowleft" size={36} color={Colors.Primary} />
            </TouchableOpacity>
            <Image
              source={require("../../../assets/bex-logo.png")}
              style={{ marginVertical: GutterSizes.md, height: 150 }}
              resizeMode="contain"
            />
            <Form component={FormView} form={form} onFinish={resetPassword}>
              <Field
                name="email"
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onSubmitEditing={resetPassword}
                />
              </Field>
            </Form>

            <TouchableOpacity
              disabled={loading}
              onPress={() => form.submit()}
              style={[
                GlobalStyles.row,
                GlobalStyles.alignCenter,
                GlobalStyles.justifyCenter,
                styles.button,
              ]}
            >
              { loading ? <ActivityIndicator /> : 
                <Text style={styles.buttonText}>Confirmar</Text>
              }
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

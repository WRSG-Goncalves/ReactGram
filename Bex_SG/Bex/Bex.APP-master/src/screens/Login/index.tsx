import React, { FunctionComponent, useContext, useEffect, useState, useRef, createRef } from "react";

import { ActivityIndicator } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import Form, { useForm } from "rc-field-form";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform  
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Checkbox } from 'react-native-paper'

import GlobalStyles from "../../styles/GlobalStyles";
import { UserContext } from "../../contexts/UserContext";
import styles from "./styles";
import Input from "../../components/Input";
import Field from "../../components/Field";
import FormView from "../../components/Form";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";
import { normalize } from "../../utils";
import { useMutation } from "react-apollo";
import { LOGIN } from "./graphql";
import { loginResponse, LoginVariables } from "./interfaces";
import { SafeAreaView } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";


let usrLogged = false;

const Login: FunctionComponent<{
  navigation: StackNavigationProp<{}>;
}> = ({ navigation }) => {
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const { login: authorize, loading } = useContext(UserContext);
  const [user, setUser] = useState('')
  
  const refs = {
    user: createRef(),
    password: createRef(),
  }

  const [form] = useForm();

  const checkUser = async (): Promise<void> => {
    const userAsync = JSON.parse(await AsyncStorage.getItem('user'))
    const saveUser = JSON.parse(await AsyncStorage.getItem('saveUser'))
    
    if(saveUser){
      if (!usrLogged) {
        setUser(userAsync)
        usrLogged = true;
      }
    }
  }

  useEffect(() => {
    if (!usrLogged) {
      checkUser()
      usrLogged = true;
    }
  }, [])

  const [login] = useMutation<loginResponse, LoginVariables>(LOGIN, {
    onCompleted: async ({ login: { token, user } }) => {
      await authorize(token, user, checkBox);
    },
  });

  const handleFilterType = (text) => {
    if (text) {
      if (text?.includes('@')) {
        return 'userName';
      }

      if (text.length === 11) {
        return 'cpf';
      }
      return 'cnpj' ;
    }
    return '';
  };

  const authenticate = async ({ user, password }: LoginVariables) => {
    try {
      await login({
        variables: {
          user,
          password,
        },
      });
    } catch (e) {
      console.log('ASDASd')
      console.log(e)
    }
  };

  const handleSubmitEditing = (name) => {
    const keys = Object.keys(refs);
    const nextKey = keys.findIndex(e => e === name)
    if ((nextKey + 1) < keys.length) {
      refs?.[keys?.[nextKey + 1]]?.current?.focus?.()
    } else {
      form?.submit()
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.LightGray}}>
      <ScrollView style={{minHeight: '100%'}}  showsVerticalScrollIndicator={false}>
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
            <FontAwesome name="user" size={32} color={Colors.LightGray} />
            <Text style={styles.headerTitle}>Login</Text>
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
            <Image
              source={require("../../../assets/bex-logo.png")}
              style={{ marginVertical: GutterSizes.md, height: 150 }}
              resizeMode="contain"
            />
            <Form component={FormView} form={form} onFinish={authenticate}>
              <Field
                name="user"
                label="User"
                rules={[{ required: true }]}
              >
                <Input
                  ref={refs['user']}
                  placeholder="Insira CPF/CNPJ ou email"
                  autoCapitalize="none"
                  defaultValue={user?.email}
                  onSubmitEditing={handleSubmitEditing}
                  returnKeyType={'next'}
                />
              </Field>
              <Field
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input
                  ref={refs['password']}
                  placeholder="Insira senha"
                  keyboardType="default"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onSubmitEditing={handleSubmitEditing}
                />
              </Field>
            </Form>
            <View
              style={[
                GlobalStyles.row,
                GlobalStyles.alignCenter,
                GlobalStyles.justifySpaceBetween,
                styles.keepDataContainer,
              ]}
            >
              <TouchableOpacity onPress={() => setCheckBox(!checkBox)}>
                <View style={[GlobalStyles.row, GlobalStyles.alignCenter]}>
                  <Checkbox.Android
                    status={checkBox ? 'checked' : 'unchecked'}
                    color={Colors.Secondary}
                  />
                  <Text style={styles.keepDataText}>Lembrar meus dados</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
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
              {loading ? <ActivityIndicator /> : 
                (<>
                  <Entypo name="login" size={20} color={Colors.LightGray} />
                  <Text style={styles.buttonText}>Acessar Portal</Text>
                </>)
              }
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;

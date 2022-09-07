import React, { FunctionComponent, useEffect, useState } from "react";
import { NavigationContainer, InitialState } from "@react-navigation/native";
import Routes from "./src/routes";
import { UserContext, UserProvider } from "./src/contexts/UserContext";
import { StatusBar, Text, Alert, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { ApolloProvider } from "react-apollo";
import { Provider as PaperProvider } from 'react-native-paper';
import DropdownAlert from "react-native-dropdownalert";
import * as Font from "expo-font";
import FlashMessage from 'react-native-flash-message'
import * as Linking from 'expo-linking';
import { FormProvider } from "rc-field-form";
import * as Constants from 'expo-constants';
import { AlertProvider } from "./src/providers/AlertProvider";
import { client } from "./src/providers/GraphQLProvider.ts";
import { validadeMessages } from "./src/config/validadeMessages";
import { navigationRef } from './src/services/RootNavigation';
import api from './src/services/api';

const App: FunctionComponent<{}> = ({ children }) => {
  const PREFIX = Linking.makeUrl('/')

  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadingFonts, setLoadingFonts] = useState<boolean>(true);
  const [saveUser, setSaveUser] = useState(null);
  const linking =  {
    prefixes: [PREFIX, 'bex://'],
    config: {
      screens: {
        UnloggedChangePassword: 'password-reset/:uid/:code',
      },
    },
  };

  const savedUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('saveUser'))
    setSaveUser(user)
  }

  useEffect(()=> {
    savedUser()
  },[])

  useEffect(() => {
    const restoreState = async () => {
      try {
        await Font.loadAsync({
          "Rubik-Black": require("./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
          "Rubik-BlackItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
          "Rubik-Bold": require("./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
          "Rubik-BoldItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
          "Rubik-Italic": require("./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
          "Rubik-Light": require("./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
          "Rubik-LightItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
          "Rubik-Medium": require("./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
          "Rubik-MediumItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
          "Rubik-Regular": require("./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
          "rubicon-icon-font": require("./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf"),
        });
        const { status, data } = await api.get('/versao-app');
        let appVersion = Constants?.default?.manifest?.version?.replace(/[.]/g, '');
        let apiVersion = data?.version?.replace(/[.]/g, '');

        appVersion =
          apiVersion?.length > appVersion?.length
            ? appVersion?.padEnd(apiVersion?.length, '0')
            : appVersion;
        apiVersion = 
          appVersion?.length > apiVersion?.length
            ? apiVersion?.padEnd(appVersion?.length, '0')
            : apiVersion;

        if (status === 200 && +appVersion < +apiVersion) {
          Alert.alert(
            'Atualização disponível',
            'Você deve atualizar o aplicativo para continuar a utilizá-lo.',
            [
              {
                text: 'OK',
                onPress: () =>
                  Linking.openURL(
                    Platform.OS === 'ios'
                      ? 'itms-apps://itunes.apple.com/'
                      : `market://details?id=br.com.bexapp`
                  ),
              },
            ]
          );
          setLoadingFonts(false);
          setIsReady(false);
          return;
        } 
      } catch (e) {
        Alert.alert('Erro ao carregar versão do app.')
        setLoadingFonts(false);
        setIsReady(false);
        return;
      } 
      setLoadingFonts(false);
      setIsReady(true);
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady || loadingFonts) {
    return <AppLoading />;
  }

  return (
    <>
      <FormProvider validateMessages={validadeMessages}>
        <PaperProvider>
          <UserProvider client={client}>
            <ApolloProvider client={client}>
              <StatusBar barStyle="light-content" />
              <NavigationContainer
                ref={navigationRef}
                linking={linking}
                fallback={<Text>Loading...</Text>}
              >
                <Routes />
                <FlashMessage position="top" />
              </NavigationContainer>
              <DropdownAlert
                ref={(dropdownRef) => AlertProvider.setDropDown(dropdownRef)}
                updateStatusBar={false}
                closeInterval={5000}
              />
            </ApolloProvider>
          </UserProvider>
        </PaperProvider>
      </FormProvider>
    </>
  );
};

export default App;

import React, { FunctionComponent } from "react";
import Login from "../../screens/Login";
import ForgotPassword from "../../screens/ForgotPassword"
import { createStackNavigator } from "@react-navigation/stack";
import UnloggedChangePassword from "../../screens/UnloggedChangePassword";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();

const AuthenticationStack: FunctionComponent<{}> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{ headerShown: false }}
        component={ForgotPassword}
      />
      <Stack.Screen name="UnloggedChangePassword" 
        component={UnloggedChangePassword} 
        options={{ headerStyle:{backgroundColor: Colors.Secondary}, headerTintColor: Colors.White, title: 'Mudar Senha'}}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;

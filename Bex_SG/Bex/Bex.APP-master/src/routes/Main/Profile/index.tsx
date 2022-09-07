import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../../../screens/Profile'
import {Colors} from '../../../constants/Colors'
import ChangePassword from '../../../screens/ChangePassword'

const Stack = createStackNavigator()

const ProfileStack: FunctionComponent = ({}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerStyle:{backgroundColor: Colors.Secondary}, headerTintColor: Colors.White, title:'Perfil'}}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerStyle:{backgroundColor: Colors.Secondary}, headerTintColor: Colors.White, title:'Mudar Senha'}}/>
        </Stack.Navigator>
    )
}

export default ProfileStack
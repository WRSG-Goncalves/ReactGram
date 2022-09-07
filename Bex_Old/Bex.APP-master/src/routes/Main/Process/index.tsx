import React, { FunctionComponent } from 'react'
import ProcessList from '../../../screens/ProcessList'
import { createStackNavigator } from '@react-navigation/stack'
import { Colors } from '../../../constants/Colors'
import ProcessDetails from '../../../screens/ProcessDetails'
import Assembly from '../../../screens/Assembly'
import Representation from '../../../screens/Representation'
import Voting from '../../../screens/Voting'
import ProgressRepresentation from '../../../screens/ProgressRepresentation'

const Stack = createStackNavigator()

const ProcessStack: FunctionComponent = ({ }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Processes" component={ProcessList} options={{ headerStyle: { backgroundColor: Colors.Secondary }, headerTintColor: Colors.White, title: 'Processos' }} />
            <Stack.Screen name="Assembly" component={Assembly} options={{ headerStyle: { backgroundColor: Colors.Secondary }, headerTintColor: Colors.White, title: 'AGC' }} />
            <Stack.Screen name="Representation" component={Representation} options={{ headerStyle: { backgroundColor: Colors.Secondary }, headerTintColor: Colors.White, title: 'AGC' }} />
            <Stack.Screen name="Voting" component={Voting} options={{ headerStyle: { backgroundColor: Colors.Secondary }, headerTintColor: Colors.White, title: 'AGC' }} />
            <Stack.Screen name="ProgressRepresentation" component={ProgressRepresentation} options={{ headerStyle: { backgroundColor: Colors.Secondary }, headerTintColor: Colors.White, title: 'AGC' }} />
        </Stack.Navigator>
    )
}

export default ProcessStack
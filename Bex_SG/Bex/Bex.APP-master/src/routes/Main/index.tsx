import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProcessStack from "./Process";
import ProfileStack from "./Profile";
import Icon from "../../components/Icon";

const Tab = createBottomTabNavigator()

const MainStack: FunctionComponent<{

}> = ({ }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Process" options={{ 
                title: 'Processos', 
                tabBarIcon: (props) => <Icon name='briefcase' {...props} /> 
            }} component={ProcessStack} />
            <Tab.Screen name="Profile" options={{ 
                title: 'Perfil' ,
                tabBarIcon: (props) => <Icon name='person' {...props} />
            }} component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default MainStack
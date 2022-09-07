import React, { FunctionComponent, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import AuthenticationStack from './Authentication';
import AppLoading from 'expo-app-loading';

import MainStack from './Main';

const Routes: FunctionComponent<{

}> = ({ }) => {
    const { isAuthenticated, loading } = useContext(UserContext)

    if (loading) {
        return <AppLoading />
    }

    if (isAuthenticated) {
        return <MainStack />
    } else {
        return <AuthenticationStack />
    }
}

export default Routes
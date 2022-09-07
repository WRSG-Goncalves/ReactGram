import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertProvider } from '../providers/AlertProvider'
import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token')

    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message }) => {
            // console.error(
            //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            // )
            AlertProvider.error('Erro', message)
        });

    if (networkError) {
        AlertProvider.error('Erro', networkError.message)
        //console.error(`[Network error]: ${networkError}`)
    }
})

const httpLink = createUploadLink({
    uri: 'https://bex-api.azurewebsites.net/graphql'
})

const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache()
})

export { client }
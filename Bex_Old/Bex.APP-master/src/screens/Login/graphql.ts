import gql from "graphql-tag";

export const LOGIN = gql`
    mutation login($user: String!, $password: String!) {
        login(userName: $user, password: $password) {
            token
            user {
                id
                userName
                email
                fullName
                cpf
                cnpj
                oab
                phoneNumber
            }
        }
    }
`
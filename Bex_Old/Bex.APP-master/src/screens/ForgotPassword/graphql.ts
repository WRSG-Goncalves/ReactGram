import gql from "graphql-tag";

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(userName: $email, password: $password) {
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
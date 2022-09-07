import gql from "graphql-tag";

export const CHANGE_PASSWORD = gql`
    mutation changePassword($password: String!) {
        changePassword(password: $password)
    }
`
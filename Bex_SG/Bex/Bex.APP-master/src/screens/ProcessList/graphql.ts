import gql from 'graphql-tag'

export const GET_PROCESSES = gql`
    query {
        processes {
            title
            number
            court
            step {
                title
                updatedAt
            }
            agc
            id
            lawyer { 
                userName
            }
            assemblies {
                id
                date
                status
                creditors {
                    representations {
                        userId
                        authorized
                    }
                }
            }
            recoverings {
                id
            }
        } 
    }
`
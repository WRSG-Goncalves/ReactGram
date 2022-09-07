import gql from "graphql-tag";

export const GET_PROCESS = gql`
    query process($id: Float!) {
        process(id: $id) {
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
                date
                status
                title
            }
        }
    }
`
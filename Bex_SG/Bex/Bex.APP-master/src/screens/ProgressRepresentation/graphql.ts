import gql from "graphql-tag";

export const GET_ASSEMBLY = gql`
    query assembly($id: Float!) {
        assembly(id: $id) {
            id
            title
            date
            status
            urlStreaming
        }
    }
`
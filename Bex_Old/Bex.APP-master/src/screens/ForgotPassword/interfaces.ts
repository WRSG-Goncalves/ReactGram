import { User } from "../../interfaces/User";

export interface resetResponse {
    reset: {
        token: string
        user: User
    }
}

export interface resetVariables {
    email: string
}
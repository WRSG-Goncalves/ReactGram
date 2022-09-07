import { User } from "../../interfaces/User";

export interface loginResponse {
    login: {
        token: string
        user: User
    }
}

export interface LoginVariables {
    user: string
    password: string
}
import { Creditor } from "../../interfaces/Creditor";
import { Assembly } from "../../interfaces/Assembly";

export interface GetCreditors {
    creditor: Creditor[]
}

export interface GetPAssemblyResponse {
    assembly: Assembly
}

export interface GetAssemblyVariables {
    id: number
}
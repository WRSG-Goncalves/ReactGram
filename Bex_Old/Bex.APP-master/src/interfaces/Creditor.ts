import { Representation } from "./Representation";

export interface Creditor {
    id: number
    name: string
    class: number
    value: number
    type: string
    representations: Representation[]
}
import { Creditor } from "./Creditor";

export interface Assembly {
    id: number
    title: string
    date: Date
    status: number
    urlStreaming: string
    creditors: Creditor[]
}
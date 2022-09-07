import { Creditor } from '../../../interfaces/Creditor'

export interface RepresentationItemProps {
    item: {
        "Id": number,
        "CredorId": number,
        "CredorNome": string,
        "CredorClasse": string,
        "CredorValor": string,
        "ComentarioSolicitacao": string,
        "DataCriado": Date,
        "Autorizado": boolean,
        "AspNetUserAutorizado": string,
        "DataAutorizado": Date,
        "ComentarioAutorizacao": string
      }
}
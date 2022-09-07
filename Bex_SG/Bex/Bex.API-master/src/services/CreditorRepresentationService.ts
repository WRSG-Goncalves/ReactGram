import { CreditorRepresentation } from '../entities/CreditorRepresentation'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class CreditorRepresentationService extends BaseService<CreditorRepresentation>{
    constructor() {
        super('CreditorRepresentation')
    }  
}
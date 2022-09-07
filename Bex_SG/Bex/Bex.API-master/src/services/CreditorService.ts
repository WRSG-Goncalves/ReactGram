import { Creditor } from '../entities/Creditor'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class CreditorService extends BaseService<Creditor>{
    constructor() {
        super('Creditor')
    }  
}
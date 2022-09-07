import { CreditorAssembly } from '../entities/CreditorAssembly'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class CreditorAssemblyService extends BaseService<CreditorAssembly>{
    constructor() {
        super('CreditorAssembly')
    }  
}
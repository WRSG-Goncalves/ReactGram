import { Assembly } from '../entities/Assembly'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class AssemblyService extends BaseService<Assembly>{
    constructor() {
        super('Assembly')
    }  
}
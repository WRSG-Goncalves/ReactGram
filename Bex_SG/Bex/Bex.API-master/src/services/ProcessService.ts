import { Process } from '../entities/Process'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class ProcessService extends BaseService<Process>{
    constructor() {
        super('Process')
    }  
}
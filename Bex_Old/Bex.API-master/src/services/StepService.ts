import { Step } from '../entities/Step'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class StepService extends BaseService<Step>{
    constructor() {
        super('Step')
    }  
}
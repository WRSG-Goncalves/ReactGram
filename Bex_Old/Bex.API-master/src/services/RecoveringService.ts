import { Recovering } from '../entities/Recovering'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class RecoveringService extends BaseService<Recovering>{
    constructor() {
        super('Recovering')
    }  
}
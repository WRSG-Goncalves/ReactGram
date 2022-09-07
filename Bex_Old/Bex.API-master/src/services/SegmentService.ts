import { Segment } from '../entities/Segment'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class SegmentService extends BaseService<Segment>{
    constructor() {
        super('Segment')
    }  
}
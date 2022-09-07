import { Role } from '../entities/Role'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class RoleService extends BaseService<Role>{
    constructor() {
        super('Role')
    }  
}
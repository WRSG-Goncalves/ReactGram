import { UserRole } from '../entities/UserRole'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'

@DataSourceService()
export class UserRoleService extends BaseService<UserRole>{
    constructor() {
        super('UserRole')
    }  
}
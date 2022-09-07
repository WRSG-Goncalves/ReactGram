import { ResolverService } from '@tsed/graphql'
import { Ctx, Query, Authorized } from 'type-graphql'
import { Role } from '../entities/Role'
import { User } from '../entities/User'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(Role)
export class RoleResolver{

  @Authorized()
  @Query(returns => [Role])
  async roles(
      @Ctx('dataSources')
      { roleService }: DataSources,

      @Ctx('user')
      user: User
  ): Promise<Role[]> {
      return await roleService.getAll()
  }

}
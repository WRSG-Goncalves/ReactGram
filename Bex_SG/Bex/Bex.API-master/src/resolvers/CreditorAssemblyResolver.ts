import { ResolverService } from '@tsed/graphql'
import {  Ctx, Query, Authorized } from 'type-graphql'
import { CreditorAssembly } from '../entities/CreditorAssembly'
import { User } from '../entities/User'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(CreditorAssembly)
export class CreditorAssemblyResolver{

  @Authorized()
  @Query(returns => [CreditorAssembly])
  async creditorAssemblies(
      @Ctx('dataSources')
      { creditorAssemblyService }: DataSources,

      @Ctx('user')
      user: User
  ): Promise<CreditorAssembly[]> {
      return await creditorAssemblyService.getAll()
  }

}
import { ResolverService } from '@tsed/graphql'
import {  Ctx, Query, Authorized } from 'type-graphql'
import { CreditorRepresentation } from '../entities/CreditorRepresentation'
import { User } from '../entities/User'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(CreditorRepresentation)
export class CreditorRepresentationResolver{

  @Authorized()
  @Query(returns => [CreditorRepresentation])
  async creditorRepresentations(
      @Ctx('dataSources')
      { creditorRepresentationService }: DataSources,

      @Ctx('user')
      user: User
  ): Promise<CreditorRepresentation[]> {
      return await creditorRepresentationService.getAll()
  }

}
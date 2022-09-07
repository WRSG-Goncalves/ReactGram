import { ResolverService } from '@tsed/graphql'
import { Ctx, Query, Authorized } from 'type-graphql'
import { Step } from '../entities/Step'
import { User } from '../entities/User'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(Step)
export class StepResolver{

  @Authorized()
  @Query(returns => [Step])
  async steps(
      @Ctx('dataSources')
      { stepService }: DataSources,

      @Ctx('user')
      user: User
  ): Promise<Step[]> {
      return await stepService.getAll()
  }

}
import { ResolverService } from '@tsed/graphql'
import { Ctx, Query, Authorized } from 'type-graphql'
import { Segment } from '../entities/Segment'
import { User } from '../entities/User'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(Segment)
export class SegmentResolver{

  @Authorized()
  @Query(returns => [Segment])
  async segments(
      @Ctx('dataSources')
      { segmentService }: DataSources,

      @Ctx('user')
      user: User
  ): Promise<Segment[]> {
      return await segmentService.getAll()
  }

}
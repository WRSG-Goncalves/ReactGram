import { ResolverService } from '@tsed/graphql'
import { FieldResolver, Ctx, Root, Query, Authorized } from 'type-graphql'
import { Recovering } from '../entities/Recovering'
import { DataSources } from '../interfaces/DataSources'
import { Segment } from '../entities/Segment'
import { User } from '../entities/User'

@ResolverService(Recovering)
export class RecoveringResolver{

    @Authorized()
    @Query(returns => [Recovering])
    async recoverings(
        @Ctx('dataSources')
        { recoveringService }: DataSources,

        @Ctx('user')
        user: User
    ): Promise<Recovering[]> {
        return await recoveringService.getAll()
    }

    @FieldResolver()
    async segment(
        @Root()
        recovering: Recovering,

        @Ctx('dataSources')
        { segmentService }: DataSources
    ): Promise<Segment | undefined>{
        return await segmentService.getById(recovering.segmentId)
    }

}
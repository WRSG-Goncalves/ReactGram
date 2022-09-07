import { ResolverService } from '@tsed/graphql'
import {  Ctx, Query, FieldResolver, Root, Arg, Authorized } from 'type-graphql'
import { Creditor } from '../entities/Creditor'
import { CreditorRepresentation } from '../entities/CreditorRepresentation'
import { User } from '../entities/User'
import { Assembly } from '../entities/Assembly'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(Creditor)
export class CreditorResolver{

    
    @Query(returns => [Creditor])
    async creditors(
        @Ctx('dataSources')
        { creditorService }: DataSources,

        @Ctx('user')
        user: User
    ): Promise<Creditor[]> {
        return await creditorService.getAll()
    }

    @Authorized()
    @Query(returns => Creditor)
    async creditor(
        @Ctx('dataSources')
        { creditorService }: DataSources,

        @Arg('id')
        id: number,

        @Ctx('user')
        user: User
    ): Promise<Creditor | undefined> {
        return await creditorService.getById(id)
    }
  
    @FieldResolver()
    async representations(
        @Root()
        creditor: Creditor,

        @Ctx('dataSources')
        { creditorRepresentationService }: DataSources
    ): Promise<CreditorRepresentation[] | undefined>{
        return await creditorRepresentationService.getAll({where:{creditorId:creditor.id}})
    }

    @FieldResolver()
    async assemblies(
        @Root()
        creditor: Creditor,

        @Ctx('dataSources')
        { assemblyService, creditorService }: DataSources
    ): Promise<Assembly[] | undefined>{
        const creditorConn = await creditorService.getOne({
            where:{id:creditor.id},
            relations:['assemblies']
            })
        return creditorConn?.assemblies
    }
}
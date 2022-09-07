import { ResolverService } from '@tsed/graphql'
import { Query, Ctx, Root, FieldResolver, Arg, Authorized } from 'type-graphql'
import { User } from '../entities/User'
import { Assembly } from '../entities/Assembly'
import { Creditor } from '../entities/Creditor'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(Assembly)
export class AssemblyService{

  @Authorized()
  @Query(returns => [Assembly])
  async assemblies(
      @Ctx('dataSources')
      { assemblyService }: DataSources,

      @Ctx('user')
      user: User
  ): Promise<Assembly[]> {
      return await assemblyService.getAll()
  }

  @Authorized()
  @Query(returns => Assembly, {nullable: true})
  async assembly(
      @Ctx('dataSources')
      { assemblyService }: DataSources,

      @Arg('id')
      id: number,

      @Ctx('user')
      user: User
  ): Promise<Assembly | undefined> {
      return await assemblyService.getById(id)
  }

  @FieldResolver()
  async creditors(
      @Root()
      assembly: Assembly,

      @Ctx('dataSources')
      { assemblyService }: DataSources
  ): Promise<Creditor[] | undefined>{
      const assemblyConn = await assemblyService.getOne({
           where:{id:assembly.id},
           relations:['creditors']
        })
      return assemblyConn?.creditors
  }

}
import { ResolverService } from '@tsed/graphql'
import { FieldResolver, Query, Ctx, Arg, Root, Authorized } from 'type-graphql'
import { Process } from '../entities/Process'
import { User } from '../entities/User'
import { Step } from '../entities/Step'
import { Creditor } from '../entities/Creditor'
import { Recovering } from '../entities/Recovering'
import { Assembly } from '../entities/Assembly'
import { DataSources } from '../interfaces/DataSources'

@ResolverService(Process)
export class ProcessResolver {
    
    @Authorized()
    @Query(returns => [Process], {nullable: true})
    async processes(
        @Ctx('dataSources')
        { userService }: DataSources,

        @Ctx('user')
        auth: User
    ): Promise<Process[] | undefined> {
        const user = await userService.getOne({where:{id: auth.id}, relations: ['processes']})
        return user?.processes        
    }

    @Authorized()
    @Query(returns => Process, {nullable: true})
    async process(
        @Arg("id")
        id: number,

        @Ctx('dataSources')
        { processService }: DataSources,

        @Ctx('user')
        auth: User
    ): Promise<Process | undefined> {
        const process = await processService.getById(id)
        if(process){
            if(process.lawyerId === auth.id ||
                process.adminId === auth.id || 
                process.technicalId === auth.id){
                    return process
                }
            throw Error('Usuário não tem permisão a esse processo')
        }
        throw Error('Processo não encontrado')
    }

    @FieldResolver()
    async lawyer(
        @Root()
        process: Process,

        @Ctx('dataSources')
        { userService }: DataSources
    ): Promise<User | undefined>{
        return await userService.getUserById(process.lawyerId)
    }

    @FieldResolver()
    async admin(
        @Root()
        process: Process,

        @Ctx('dataSources')
        { userService }: DataSources
    ): Promise<User | undefined>{
        return await userService.getUserById(process.adminId)
    }

    @FieldResolver()
    async technical(
        @Root()
        process: Process,

        @Ctx('dataSources')
        { userService }: DataSources
    ): Promise<User | undefined>{
        return await userService.getUserById(process.technicalId)
    }

    @FieldResolver()
    async step(
        @Root()
        process: Process,

        @Ctx('dataSources')
        { stepService }: DataSources
    ): Promise<Step | undefined>{
        return await stepService.getById(process.stepId)
    }

    @FieldResolver(type => Process)
    async creditors(
        @Root()
        process: Process,

        @Ctx('dataSources')
        { creditorService }: DataSources
    ): Promise<Creditor[] | undefined>{
        return await creditorService.getAll({where:{processId:process.id}})
    }

    @FieldResolver(type => Process)
    async recoverings(
        @Root()
        process: Process,

        @Ctx('dataSources')
        { recoveringService }: DataSources
    ): Promise<Recovering[] | undefined>{
        return await recoveringService.getAll({where:{processId:process.id}})
    }

    @FieldResolver(type => Process)
    async assemblies(
        @Root()
        process: Process,

        @Ctx('dataSources')
        { assemblyService }: DataSources
    ): Promise<Assembly[] | undefined>{
        return await assemblyService.getAll({where:{processId:process.id}})
    }

}
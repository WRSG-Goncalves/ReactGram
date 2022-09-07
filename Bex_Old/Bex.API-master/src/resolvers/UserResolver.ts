import { ResolverService } from '@tsed/graphql'
import { Mutation, Query, Ctx, Arg, Authorized } from 'type-graphql'
import { User } from '../entities/User'
import { DataSources } from '../interfaces/DataSources'
import { UserToken } from '../objects/UserToken'
import { UserInput } from '../inputs/UserInput'

@ResolverService(User)
export class UserResolver {

    //@Authorized()
    @Query(returns => [User])
    async users(
        @Ctx('dataSources')
        { userService }: DataSources,

        @Ctx('user')
        user: User
    ): Promise<User[]> {
        return await userService.getAll({ relations: ['roles'] })
    }

    @Mutation(returns => UserToken)
    async login(
        @Arg("userName")
        userName: string,

        @Arg("password")
        password: string,

        @Ctx('dataSources')
        { userService }: DataSources

    ): Promise<UserToken | undefined> {
        return await userService.login(userName, password)
    }

    @Mutation(returns => User)
    async updateUser(
        @Arg("id")
        id: string,

        @Arg("user")
        user: UserInput,

        @Ctx('dataSources')
        { userService }: DataSources
    ): Promise<User> {
        return await userService.update(id, user)
    }

    @Mutation(returns => User)
    async editProfile(

        @Arg("user")
        user: UserInput,

        @Ctx('dataSources')
        { userService }: DataSources,

        @Ctx('user')
        userCtx: User
    ): Promise<User> {
        return await userService.update(userCtx.id, user)
    }

    @Mutation(returns => Boolean)
    async changePassword(
        @Arg('password')
        password: string,

        @Ctx('user')
        user: User,

        @Ctx('dataSources')
        { userService }: DataSources
    ): Promise<boolean> {
        return await userService.changePassword(user.id, password)
    }
}
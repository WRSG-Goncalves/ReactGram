import { User } from '../entities/User'
import { BaseService } from './BaseService'
import { DataSourceService } from '@tsed/graphql'
import { UserToken } from '../objects/UserToken'
import * as jwt from 'jsonwebtoken'

import * as passwordHasher from 'aspnet-identity-pw'

@DataSourceService()
export class UserService extends BaseService<User>{
    constructor() {
        super('User', 'Usuário')
    }

    async getUserById(id: string): Promise<User | undefined> {
        return await this.getOne({ where: { id: id } })
    }

    async getByEmail(email: string) {
        return this.getOne({
            where: {
                email: email
            }
        })
    }

    async getByUserName(userName: string) {
        return this.getOne({
            where: {
                userName: userName
            }
        })
    }

    async login(userName: string, password: string): Promise<UserToken | undefined> {
        const user = await this.getByUserName(userName)

        if (!user) {
            throw Error('user not found!')
        }

        const matchPassword = await passwordHasher.validatePassword(password, user.passwordHash)

        if (!matchPassword) {
            throw Error('Incorrect Password!')
        }

        const token = jwt.sign(JSON.stringify(user), 'shhhhh');
        const userToken = { user, token }

        return userToken
    }

    async changePassword(id: number | string, password: string): Promise<boolean> {
        const user = await this.getById(id)

        if (!user) {
            throw Error('User not found!')
        }

        const passwordHash = passwordHasher.hashPassword(password)

        await this.update(id, {...user, passwordHash })

        return true
    }
}
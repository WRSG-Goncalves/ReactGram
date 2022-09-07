import { ObjectType, Field } from 'type-graphql'
import { User } from '../entities/User'

@ObjectType()
export class UserToken {

  @Field()
  user: User

  @Field()
  token: string
}
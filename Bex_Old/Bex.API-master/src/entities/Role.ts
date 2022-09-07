import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { User } from './User'

@Entity({
    name: 'AspNetRoles'
})
@ObjectType()
export class Role {
    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: number

    @Column({
        name:'Name'
    })
    @Field()
    title: string

    @ManyToMany(type => User, user => user.roles)
    @JoinTable({
        name: 'AspNetUserRoles',
        joinColumns: [
            { name: 'RoleId'}
        ],
        inverseJoinColumns: [
            { name: 'UserId'}  
        ]
    })
    @Field(type => User)
    users: User[];

}
import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Recovering } from './Recovering'

@Entity({
    name: 'Segmento'
})
@ObjectType()
export class Segment {
    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: number

    @Column({
        name:'Nome'
    })
    @Field()
    name: string

    @Column({
        name:'Valor'
    })
    @Field()
    value: number

    @Column({
      name:'AspNetUserCriadorId'
    })
    @Field()
    userCreatedId: string

    @OneToMany(type => Recovering, recovering => recovering.segment)
    @Field(type=>Recovering)
    recoverings: Recovering[]
}

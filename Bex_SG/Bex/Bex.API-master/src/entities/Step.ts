import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Process } from './Process'

@Entity({
    name: 'Fase'
})
@ObjectType()
export class Step {
    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: number

    @Column({
        name:'Titulo'
    })
    @Field()
    title: string

    @Column({
        name:'Descricao'
    })
    @Field()
    description: string

    @Column({
        name:'DataEditado'
    })
    @Field()
    updatedAt: string

    @OneToMany(type => Process, process => process.step)
    process: Process[]
}
import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany,
  JoinColumn, JoinTable } from "typeorm"
import { Process } from './Process'
import { Assembly } from './Assembly'
import { CreditorRepresentation } from './CreditorRepresentation'

@Entity({
    name: 'Credor'
})
@ObjectType()
export class Creditor {
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
        name:'Classe'
    })
    @Field()
    class: number

    @Column({
      name:'ProcessoId'
    })
    @Field()
    processId: number

    // @Column({
    //   name:'AspNetUserCriadorId'
    // })
    // @Field()
    // userCreatedId: string

    // @Column({
    //   name:'DataCriado'
    // })
    // @Field()
    // createdAt: Date

    // @Column({
    //   name:'AspNetUserEditorId'
    // })
    // @Field()
    // userUdpatedId: string

    // @Column({
    //   name:'DataEditado'
    // })
    // @Field()
    // updatedAt: Date

    @Column({
      name:'Tipo'
    })
    @Field()
    type: string

    @Column({
      name:'IsDeleted'
    })
    @Field()
    isDeleted: boolean

    @ManyToOne(type => Process, process => process.creditors)
    @JoinColumn({ name: 'ProcessoId'})
    @Field(type=> Process)
    process: Process

    @OneToMany(type => CreditorRepresentation, creditorRepresentation => creditorRepresentation.creditor)
    @Field(type=>CreditorRepresentation)
    representations: CreditorRepresentation[]

    @ManyToMany(type => Assembly, assembly => assembly.creditors)
    @JoinTable({
        name: 'AssembleiaCredor',
        joinColumns: [
            { name: 'CredorId'}
        ],
        inverseJoinColumns: [
            { name: 'AssembleiaId'}  
        ]
    })
    @Field(type => Assembly)
    assemblies: Assembly[];
}

//[RecuperandaId]

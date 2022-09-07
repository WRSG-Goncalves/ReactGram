import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm"
import { Process } from './Process'
import { Creditor } from './Creditor'

@Entity({
    name: 'Assembleia'
})
@ObjectType()
export class Assembly {

    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: number

    @Column({
        name:'AspNetUserCriadorId'
    })
    @Field()
    creatorId: string

    @Column({
      name:'ProcessoId'
    })
    @Field()
    processId: number

    @Column({
      name:'DataCriado'
    })
    @Field()
    createdAt: Date

    @Column({
      name:'AspNetUserEditorId'
    })
    @Field()
    userUdpatedId: string

    @Column({
      name:'DataEditado'
    })
    @Field()
    updatedAt: Date

    @Column({
      name:'Data'
    })
    @Field()
    date: Date

    @Column({
      name:'Titulo'
    })
    @Field()
    title: string

    @Column({
      name:'Status'
    })
    @Field()
    status: string

    @Column({
      name:'Rua'
    })
    @Field()
    street: string

    @Column({
      name:'Numero'
    })
    @Field()
    number: string

    @Column({
      name:'Complemento'
    })
    @Field()
    complemento: string

    @Column({
      name:'Cidade'
    })
    @Field()
    city: string

    @Column({
      name:'Estado'
    })
    @Field()
    state: string

    @Column({
      name:'CEP'
    })
    @Field()
    cep: string

    @Column({
      name:'TextoVotacao'
    })
    @Field()
    textVoting: string

    @Column({
      name:'TextoVotacao2'
    })
    @Field()
    textVoting2: string

    @Column({
      name:'TextoVotacao3'
    })
    @Field()
    textVoting3: string

    @Column({
      name:'TextoVotacao4'
    })
    @Field()
    textVoting4: string

    @Column({
      name:'TextoVotacao5'
    })
    @Field()
    textVoting5: string

    @Column({
      name: 'UrlTransmissao'
    })
    @Field({ nullable: true})
    urlStreaming: string

    @ManyToOne(type => Process, process => process.assemblies)
    @JoinColumn({ name: 'ProcessoId'})
    @Field(type=> Process)
    process: Process

    @ManyToMany(type => Creditor, creditor => creditor.assemblies)
    @JoinTable({
        name: 'AssembleiaCredor',
        joinColumns: [
            { name: 'AssembleiaId'}
        ],
        inverseJoinColumns: [
            { name: 'CredorId'}  
        ]
    })
    @Field(type => Creditor)
    creditors: Creditor[];
}

//[AmbienteVirtualId]


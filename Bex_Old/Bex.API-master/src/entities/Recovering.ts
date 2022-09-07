import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Process } from './Process'
import { Segment } from './Segment'

@Entity({
    name: 'Recuperanda'
})
@ObjectType()
export class Recovering {
    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: number

    @Column({
        name:'Cnpj'
    })
    @Field()
    cnpj: string

    @Column({
        name:'RazaoSocial'
    })
    @Field()
    companyName: string

    @Column({
        name:'Falida'
    })
    @Field()
    brankrupt: boolean

    @Column({
      name:'ProcessoId'
    })
    @Field()
    processId: number

    @Column({
      name:'AspNetUserCriadorId'
    })
    @Field()
    userCreatedId: string

    @Column({
      name:'SegmentoId'
    })
    @Field()
    segmentId: number

    @Column({
      name:'Estado'
    })
    @Field()
    state: string

    @ManyToOne(type => Process, process => process.recoverings)
    @JoinColumn({ name: 'ProcessoId'})
    @Field(type=> Process)
    process: Process

    @ManyToOne(type => Segment, segment => segment.recoverings)
    @JoinColumn({ name: 'SegmentoId'})
    @Field(type=> Segment)
    segment: Segment
}


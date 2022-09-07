import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { Creditor } from './Creditor'


@Entity({
    name: 'RepresentacaoCredor'
})
@ObjectType()
export class CreditorRepresentation {
    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: number

    @Column({
      name:'AspNetUserId'
    })
    @Field()
    userId: string

    @Column({
      name:'CredorId'
    })
    @Field()
    creditorId: number

    @Column({
      name:'ComentarioSolicitacao'
    })
    @Field()
    solicitationComent: string

    @Column({
      name:'DataCriado'
    })
    @Field()
    createdAt: Date

    @Column({
      name:'Autorizado'
    })
    @Field()
    authorized: boolean

    @Column({
      name:'AspNetUserIdAdm'
    })
    @Field()
    adminId: string

    @Column({
      name:'DataAutorizacao'
    })
    @Field()
    authorizedAt: Date

    
    @Column({
      name:'ComentarioAutorizacao'
    })
    @Field({nullable:true})
    autorizedComent: string


    @ManyToOne(type => Creditor, creditor => creditor.representations)
    @JoinColumn({ name: 'CredorId'})
    @Field(type=> Creditor)
    creditor: Creditor
}


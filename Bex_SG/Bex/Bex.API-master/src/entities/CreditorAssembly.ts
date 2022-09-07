import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm"

@Entity({
    name: 'AssembleiaCredor'
})
@ObjectType()
export class CreditorAssembly {
    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: number

    @Column({
        name:'AssembleiaId'
    })
    @Field()
    assemblyId: number

    @Column({
        name:'CredorId'
    })
    @Field()
    creditorId: number

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

    @Column({
      name:'DataCriado'
    })
    @Field()
    createdAt: Date

    @Column({
      name:'AspNetUserRepresentanteId'
    })
    @Field({nullable: true})
    representativeId: string

    @Column({
      name:'DataRepresentante'
    })
    @Field({nullable: true})
    representativeAt: Date

    @Column({
      name:'TipoAcessoRepresentante'
    })
    @Field({nullable: true})
    representativeType: string

    @Column({
      name:'Voto'
    })
    @Field({nullable: true})
    vote: number

    @Column({
      name:'DataVoto'
    })
    @Field({nullable: true})
    voteAt: Date

    @Column({
      name:'Voto2'
    })
    @Field({nullable: true})
    vot2e: number

    @Column({
      name:'DataVoto2'
    })
    @Field({nullable: true})
    voteAt2: Date

    @Column({
      name:'Voto3'
    })
    @Field({nullable: true})
    vote3: number

    @Column({
      name:'DataVoto3'
    })
    @Field({nullable: true})
    voteAt3: Date

    @Column({
      name:'Voto4'
    })
    @Field({nullable: true})
    vote4: number

    @Column({
      name:'DataVoto4'
    })
    @Field({nullable: true})
    voteAt4: Date

    @Column({
      name:'Voto5'
    })
    @Field({nullable: true})
    vote5: number

    @Column({
      name:'DataVoto5'
    })
    @Field({nullable: true})
    voteAt5: Date

    @Column({
      name:'AspNetUserVotoId'
    })
    @Field({nullable: true})
    voterId: string

}


//       ,[AspNetUserVotoId]




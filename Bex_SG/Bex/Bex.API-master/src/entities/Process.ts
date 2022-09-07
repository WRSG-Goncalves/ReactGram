import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { User } from './User'
import { Step } from './Step'
import { Creditor } from './Creditor'
import { Recovering } from './Recovering'
import { Assembly } from './Assembly'

@Entity({
    name: 'Processo'
})
@ObjectType()
export class Process {

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
        name:'Numero'
    })
    @Field()
    number: string

    @Column({
        name:'IdentificacaoVara'
    })
    @Field()
    court: string

    @Column({
      name:'DataCriado'
    })
    @Field()
    createdAt: string

    @Column({
      name:'Finalizado'
    })
    @Field()
    finished: string

    @Column({
      name:'DataFinalizado'
    })
    @Field()
    finishedAt: string

    @Column({
      name:'AcompanhamentoTecnico'
    })
    @Field()
    technicalMonitoring: string

    @Column({
      name:'ListaCredores'
    })
    @Field()
    creditorsList: string

    @Column({
      name:'Agc'
    })
    @Field()
    agc: string

    @Column({
      name:'DataPedido'
    })
    @Field()
    processAt: string

    @Column({
      name:'AspNetUserAdvogadoId'
    })
    @Field()
    lawyerId: string

    @Column({
      name:'AspNetUserTecnicoId'
    })
    @Field()
    technicalId: string

    @Column({
      name:'AspNetUserAdmId'
    })
    @Field()
    adminId: string

    @Column({
      name:'FaseId'
    })
    @Field()
    stepId: number

    @ManyToOne(type => User, user => user.lawyerProcess)
    @JoinColumn({ name: 'AspNetUserAdvogadoId'})
    @Field(type => User)
    lawyer: User

    @ManyToOne(type => User, user => user.adminProcess)
    @JoinColumn({ name: 'AspNetUserAdmId'})
    @Field(type => User)
    admin: User

    @ManyToOne(type => User, user => user.technicalProcess)
    @JoinColumn({ name: 'AspNetUserTecnicoId'})
    @Field(type => User)
    technical: User

    @ManyToOne(type => Step, step => step.process)
    @JoinColumn({ name: 'FaseId'})
    @Field(type => Step)
    step: Step

    @OneToMany(type => Creditor, creditor => creditor.process)
    @Field(type=>Creditor)
    creditors: Creditor[]

    @OneToMany(type => Recovering, recovering => recovering.process)
    @Field(type=>Recovering)
    recoverings: Recovering[]

    @OneToMany(type => Assembly, assembly => assembly.process)
    @Field(type=>Assembly)
    assemblies: Assembly[]

    @ManyToMany(type => User, user => user.processes)
    @JoinTable()
    @Field(type => Process)
    users: User[];
}

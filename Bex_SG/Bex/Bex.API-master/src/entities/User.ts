import { ObjectType, Field } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Process } from './Process'
import { Role } from './Role'

@Entity({
    name: 'AspNetUsers'
})
@ObjectType()
export class User {

    @PrimaryGeneratedColumn({
        name:'Id'
    })
    @Field()
    id: string

    @Column({
        name:'Email'
    })
    @Field()
    email: string

    @Column({
        name:'PasswordHash'
    })
    @Field()
    passwordHash: string

    @Column({
        name:'UserName'
    })
    @Field()
    userName: string

    @Column({
        name:'EmailConfirmed'
    })
    @Field()
    emailConfirmed: boolean

    @Column({
        name:'PhoneNumber'
    })
    @Field({nullable: true})
    phoneNumber: string

    @Column({
        name:'PhoneNumberConfirmed'
    })
    @Field()
    phoneNumberConfirmed: boolean

    @Column({
        name:'TwoFactorEnabled'
    })
    @Field()
    twoFactorEnabled: boolean

    @Column({
        name:'LockoutEnabled'
    })
    @Field()
    lockoutEnabled: boolean

    @Column({
        name:'NomeCompleto'
    })
    @Field()
    fullName: string

    @Column({
        name:'Oab'
    })
    @Field({nullable: true})
    oab: string

    @Column({
        name:'Ativo'
    })
    @Field()
    active: boolean

    @Column({
        name:'DataCadastro'
    })
    @Field()
    createdAt: Date

    @Column({
        name:'Cpf'
    })
    @Field({nullable: true})
    cpf: string

    @Column({
        name:'Cnpj'
    })
    @Field({nullable: true})
    cnpj: string

    @Column({
        name:'CodigoAcesso'
    })
    @Field({nullable: true})
    acessCode: string


    @OneToMany(type => Process, process => process.lawyer)
    lawyerProcess: Process[]

    @OneToMany(type => Process, process => process.admin)
    adminProcess: Process[]

    @OneToMany(type => Process, process => process.technical)
    technicalProcess: Process[]

    @ManyToMany(type => Role, role => role.users)
    @JoinTable({
        name: 'AspNetUserRoles',
        joinColumns: [
            { name: 'UserId'}
        ],
        inverseJoinColumns: [
            { name: 'RoleId'}  
        ]
    })
    @Field(type => Role)
    roles: Role[];

    @ManyToMany(type => Process, process => process.users)
    @JoinTable({
        name: 'ProcessoAspNetUser',
        joinColumns: [
            { name: 'AspNetUserId'}
        ],
        inverseJoinColumns: [
            { name: 'ProcessoId'}  
        ]
    })
    @Field(type => Process)
    processes: Process[];
}

//	RequerCertificado	CertificadoBase64	PenultimoLogin  CodigoAcesso

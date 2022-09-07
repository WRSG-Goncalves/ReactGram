import { InputType, Field } from 'type-graphql'
import { Column, Entity } from "typeorm";


@InputType()
export class UserInput {

    @Field({ nullable: true})
    cpf: string

    @Field({ nullable: true})
    cnpj: string

    @Field({ nullable: true})
    phoneNumber: string

    @Field({ nullable: true})
    oab: string

    


    
}
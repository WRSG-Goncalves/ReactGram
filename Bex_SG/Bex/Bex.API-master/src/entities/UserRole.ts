import { Column, Entity} from "typeorm"

@Entity({
    name: 'AspNetUserRoles'
})
export class UserRole {

    @Column({
      name:'UserId',
      primary: true
    })
    userId: number


    @Column({
      name:'RoleId',
      primary: true
    })
    roleId: number

}
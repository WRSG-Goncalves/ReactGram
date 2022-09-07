import { AuthChecker } from 'type-graphql'
import { User } from '../entities/User'

const AuthChecker: AuthChecker<{
  user: User
}> = ({ context }, roles) => {
  if(context.user){
    return true
  }else{
    return false
  }
}

export { AuthChecker }